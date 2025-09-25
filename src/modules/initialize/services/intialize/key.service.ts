import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";
import { Configuration } from "@config/configuration";
import { User } from "@module/user/entities/user.entity";

// DTOs và Interfaces
export interface UpdateKeyDto {
    name: string;
}

export interface SubjectFieldValues {
    C: string;        // Country
    CN: string;       // Common Name
    serialNumber: string;
    O: string;        // Organization
}

export interface GenerateCSRDto {
    key_usage_type: 'SIGNING' | 'AUTHENTICATION';
    ca_name: string;
    csr_format: 'PEM' | 'DER';
    subject_field_values: SubjectFieldValues;
    member_id?: string; // Required only for SIGNING keys
}

export interface CSRQueryParams {
    csr_format?: 'PEM' | 'DER';
}

@Injectable()
export class KeyService {
    private readonly logger = new Logger(KeyService.name);
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
     * Lấy thông tin key theo ID
     */
    async getKeyById(user: User, id: string) {
        const url = `${this.ssConfigUrl}/keys/${id}`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Xóa key theo ID
     */
    async deleteKeyById(user: User, id: string) {
        const url = `${this.ssConfigUrl}/keys/${id}`;
        const response = await this.makeRequest('DELETE', url);
        
        return response.data;
    }

    /**
     * Cập nhật thông tin key theo ID
     */
    async updateKeyById(user: User, id: string, updateDto: UpdateKeyDto) {
        if (!updateDto.name) {
            throw new BadRequestException('Thiếu thông tin name');
        }

        const requestBody = {
            name: updateDto.name
        };

        const url = `${this.ssConfigUrl}/keys/${id}`;
        const response = await this.makeRequest('PATCH', url, requestBody);
        
        return response.data;
    }

    /**
     * Tạo CSR (Certificate Signing Request) cho key
     */
    async generateCSR(user: User, keyId: string, generateCSRDto: GenerateCSRDto) {
        const { key_usage_type, ca_name, csr_format, subject_field_values, member_id } = generateCSRDto;

        // Validation
        if (!key_usage_type || !ca_name || !csr_format || !subject_field_values) {
            throw new BadRequestException('Thiếu thông tin bắt buộc: key_usage_type, ca_name, csr_format, subject_field_values');
        }

        if (key_usage_type === 'SIGNING' && !member_id) {
            throw new BadRequestException('member_id là bắt buộc cho SIGNING key');
        }

        // Validation subject_field_values
        const requiredFields = ['C', 'CN', 'serialNumber', 'O'];
        for (const field of requiredFields) {
            if (!subject_field_values[field]) {
                throw new BadRequestException(`Thiếu thông tin subject_field_values.${field}`);
            }
        }

        const requestBody: any = {
            key_usage_type,
            ca_name,
            csr_format,
            subject_field_values: {
                C: subject_field_values.C,
                CN: subject_field_values.CN,
                serialNumber: subject_field_values.serialNumber,
                O: subject_field_values.O
            }
        };

        // Thêm member_id nếu là SIGNING key
        if (key_usage_type === 'SIGNING') {
            requestBody.member_id = member_id;
        }

        const url = `${this.ssConfigUrl}/keys/${keyId}/csrs`;
        const response = await this.makeRequest('POST', url, requestBody);
        
        // Tạo filename cho download
        const filename = this.generateCSRFilename(key_usage_type, csr_format);
        
        return {
            data: response.data,
            filename: filename,
            contentType: this.getCSRContentType(csr_format)
        };
    }

    /**
     * Download CSR theo key ID và CSR ID
     */
    async downloadCSR(user: User, keyId: string, csrId: string, queryParams: CSRQueryParams = {}) {
        const { csr_format = 'PEM' } = queryParams;
        
        const url = `${this.ssConfigUrl}/keys/${keyId}/csrs/${csrId}`;
        const params = {
            csr_format: csr_format.toUpperCase()
        };
        
        const response = await this.makeRequest('GET', url, null, params);
        
        // Tạo filename cho download
        const filename = this.generateDownloadFilename(csr_format);
        
        return {
            data: response.data,
            filename: filename,
            contentType: this.getCSRContentType(csr_format)
        };
    }

    /**
     * Xóa CSR theo key ID và CSR ID
     */
    async deleteCSR(user: User, keyId: string, csrId: string) {
        const url = `${this.ssConfigUrl}/keys/${keyId}/csrs/${csrId}`;
        const response = await this.makeRequest('DELETE', url);
        
        return response.data;
    }

    /**
     * Lấy các possible actions cho CSR
     */
    async getCSRPossibleActions(user: User, keyId: string, csrId: string) {
        const url = `${this.ssConfigUrl}/keys/${keyId}/csrs/${csrId}/possible-actions`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Lấy các possible actions cho key
     */
    async getKeyPossibleActions(user: User, keyId: string) {
        const url = `${this.ssConfigUrl}/keys/${keyId}/possible-actions`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    // Helper methods

    /**
     * Tạo filename cho CSR khi generate
     */
    private generateCSRFilename(keyUsageType: string, csrFormat: string): string {
        const prefix = keyUsageType.toLowerCase() === 'signing' ? 'sign' : 'auth';
        const timestamp = this.getCurrentDateTimeString();
        const extension = csrFormat.toLowerCase();
        
        return `${prefix}_${timestamp}.${extension}`;
    }

    /**
     * Tạo filename cho CSR khi download
     */
    private generateDownloadFilename(csrFormat: string): string {
        const timestamp = this.getCurrentDateTimeString();
        const extension = csrFormat.toLowerCase();
        
        return `csr_${timestamp}.${extension}`;
    }

    /**
     * Lấy content type cho CSR format
     */
    private getCSRContentType(csrFormat: string): string {
        switch (csrFormat.toUpperCase()) {
            case 'PEM':
                return 'application/x-pem-file';
            case 'DER':
                return 'application/x-x509-certificate';
            default:
                return 'application/octet-stream';
        }
    }

    /**
     * Tạo datetime string cho filename (tương tự Utils.FILENAME_DATETIME_NOW() trong Java)
     */
    private getCurrentDateTimeString(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
    }
}
