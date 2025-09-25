import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";
import { Configuration } from "@config/configuration";
import { User } from "@module/user/entities/user.entity";

export interface UpdateTokenDto {
    name: string;
}

export interface ChangePinDto {
    old_pin: string;
    new_pin: string;
}

export interface LoginDto {
    password: string;
}

export interface SubjectFieldValues {
    C: string;
    CN: string;
    serialNumber: string;
    O: string;
}

export interface CSRGenerateRequest {
    key_usage_type: string;
    ca_name: string;
    csr_format: string;
    subject_field_values: SubjectFieldValues;
    member_id?: string; // Required only for SIGNING keys
}

export interface AddKeyDto {
    key_label: string;
    csr_generate_request: CSRGenerateRequest;
}

@Injectable()
export class TokenService {
    private readonly logger = new Logger(TokenService.name);
    private readonly ssConfigUrl: string;
    private readonly ssApiKey: string;

    constructor(
        private readonly configService: ConfigService<Configuration>,
        private readonly httpService: HttpService
    ) {
        // Cấu hình từ environment variables
        this.ssConfigUrl = process.env.SS_CONFIG_URL;
        this.ssApiKey = process.env.SS_API_KEY;
    }

    private getHeaders(contentType: string = 'application/json') {
        return {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': contentType,
            'Accept': 'application/json'
        };
    }

    private async makeRequest<T = any>(
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        url: string,
        data?: any,
        params?: any,
        headers?: any
    ): Promise<AxiosResponse<T>> {
        try {
            const config = {
                method,
                url,
                headers: headers || this.getHeaders(),
                ...(data && { data }),
                ...(params && { params })
            };

            this.logger.log(`Making ${method} request to: ${url}`);
            return await lastValueFrom(this.httpService.request<T>(config));
        } catch (error) {
            this.logger.error(`Request failed: ${error.message}`, error.stack);
            throw error;
        }
    }

    /**
     * Lấy danh sách tất cả tokens
     */
    async getAll(user: User) {
        const url = `${this.ssConfigUrl}/tokens`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Lấy token theo ID
     */
    async getById(user: User, id: number) {
        const url = `${this.ssConfigUrl}/tokens/${id}`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Cập nhật token theo ID
     */
    async editById(user: User, id: number, updateTokenDto: UpdateTokenDto) {
        // Validation như trong Java
        if (!updateTokenDto.name) {
            throw new BadRequestException('Thiếu thông tin name');
        }

        const url = `${this.ssConfigUrl}/tokens/${id}`;
        const requestBody = {
            name: updateTokenDto.name
        };

        const response = await this.makeRequest('PATCH', url, requestBody);
        
        return response.data;
    }

    /**
     * Thay đổi PIN của token
     */
    async changePinById(user: User, id: number, changePinDto: ChangePinDto) {
        // Validation như trong Java
        if (!changePinDto.old_pin || !changePinDto.new_pin) {
            throw new BadRequestException('Thiếu thông tin old_pin hoặc new_pin');
        }

        const url = `${this.ssConfigUrl}/tokens/${id}/pin`;
        const requestBody = {
            old_pin: changePinDto.old_pin,
            new_pin: changePinDto.new_pin
        };

        const response = await this.makeRequest('PUT', url, requestBody);
        
        return response.data;
    }

    /**
     * Login vào token
     */
    async loginById(user: User, id: number, loginDto: LoginDto) {
        // Validation như trong Java
        if (!loginDto.password) {
            throw new BadRequestException('Thiếu thông tin password');
        }

        const url = `${this.ssConfigUrl}/tokens/${id}/login`;
        const headers = {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        const requestBody = {
            password: loginDto.password
        };

        const response = await this.makeRequest('PUT', url, requestBody, null, headers);
        
        return response.data;
    }

    /**
     * Logout khỏi token
     */
    async logoutById(user: User, id: number) {
        const url = `${this.ssConfigUrl}/tokens/${id}/logout`;
        const headers = {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const response = await this.makeRequest('PUT', url, null, null, headers);
        
        return response.data;
    }

    /**
     * Thêm Auth/Sign key vào token
     */
    async addAuthSignKeyOfToken(user: User, id: number, addKeyDto: AddKeyDto) {
        // Validation như trong Java
        this.validateAddKeyDto(addKeyDto);

        const url = `${this.ssConfigUrl}/tokens/${id}/keys`;
        const headers = {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const requestBody = this.buildKeyRequestBody(addKeyDto);
        const response = await this.makeRequest('POST', url, requestBody, null, headers);
        
        return response.data;
    }

    /**
     * Thêm Auth/Sign key với CSRs vào token
     */
    async addAuthSignKeyWithCsrsOfToken(user: User, id: number, addKeyDto: AddKeyDto) {
        // Validation như trong Java
        this.validateAddKeyDto(addKeyDto);

        const url = `${this.ssConfigUrl}/tokens/${id}/keys-with-csrs`;
        const headers = {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': 'application/json'
        };

        const requestBody = this.buildKeyRequestBody(addKeyDto);
        const response = await this.makeRequest('POST', url, requestBody, null, headers);
        
        return response.data;
    }

    private validateAddKeyDto(addKeyDto: AddKeyDto) {
        if (!addKeyDto.key_label || !addKeyDto.csr_generate_request) {
            throw new BadRequestException('Thiếu thông tin key_label hoặc csr_generate_request');
        }

        const csrRequest = addKeyDto.csr_generate_request;
        if (!csrRequest.key_usage_type || !csrRequest.ca_name || 
            !csrRequest.csr_format || !csrRequest.subject_field_values) {
            throw new BadRequestException('Thiếu thông tin trong csr_generate_request');
        }

        const subjectFields = csrRequest.subject_field_values;
        if (!subjectFields.C || !subjectFields.CN || 
            !subjectFields.serialNumber || !subjectFields.O) {
            throw new BadRequestException('Thiếu thông tin trong subject_field_values');
        }

        // Validation đặc biệt cho SIGNING key
        if (csrRequest.key_usage_type.toUpperCase() === 'SIGNING' && !csrRequest.member_id) {
            throw new BadRequestException('Thiếu thông tin member_id cho SIGNING key');
        }
    }

    private buildKeyRequestBody(addKeyDto: AddKeyDto) {
        const requestBody: any = {
            key_label: addKeyDto.key_label,
            csr_generate_request: {
                key_usage_type: addKeyDto.csr_generate_request.key_usage_type,
                ca_name: addKeyDto.csr_generate_request.ca_name,
                csr_format: addKeyDto.csr_generate_request.csr_format,
                subject_field_values: {
                    C: addKeyDto.csr_generate_request.subject_field_values.C,
                    CN: addKeyDto.csr_generate_request.subject_field_values.CN,
                    serialNumber: addKeyDto.csr_generate_request.subject_field_values.serialNumber,
                    O: addKeyDto.csr_generate_request.subject_field_values.O
                }
            }
        };

        // Thêm member_id nếu là SIGNING key
        if (addKeyDto.csr_generate_request.key_usage_type.toUpperCase() === 'SIGNING') {
            requestBody.csr_generate_request.member_id = addKeyDto.csr_generate_request.member_id;
        }

        return requestBody;
    }
}
