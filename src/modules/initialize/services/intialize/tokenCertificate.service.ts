import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";
import { Configuration } from "@config/configuration";
import { User } from "@module/user/entities/user.entity";
const FormData = require('form-data');

export interface RegisterDto {
    address: string;
}

@Injectable()
export class TokenCertificateService {
    private readonly logger = new Logger(TokenCertificateService.name);
    private readonly ssConfigUrl: string;
    private readonly ssApiKey: string;
    private readonly ssIp: string;

    constructor(
        private readonly configService: ConfigService<Configuration>,
        private readonly httpService: HttpService
    ) {
        // Cấu hình từ environment variables
        this.ssConfigUrl = process.env.SS_CONFIG_URL;
        this.ssApiKey = process.env.SS_API_KEY;
        this.ssIp = process.env.SS_IP;
    }

    private getHeaders(contentType: string = 'application/json') {
        return {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': contentType,
            'Accept': 'application/json'
        };
    }

    private getFileHeaders() {
        return {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': 'application/octet-stream',
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
     * Import certificate mới
     */
    async importNew(user: User, file: Express.Multer.File) {
        const url = `${this.ssConfigUrl}/token-certificates`;
        
        const formData = new FormData();
        formData.append('file', file.buffer, {
            filename: file.originalname,
            contentType: 'application/octet-stream'
        });

        const headers = {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': 'application/octet-stream',
            'Accept': 'application/json',
            ...formData.getHeaders()
        };

        const response = await this.makeRequest('POST', url, formData, null, headers);
        
        return response.data;
    }

    /**
     * Lấy certificate theo hash
     */
    async getByHash(user: User, hash: string) {
        const url = `${this.ssConfigUrl}/token-certificates/${hash}`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Xóa certificate theo hash
     */
    async deleteByHash(user: User, hash: string) {
        const url = `${this.ssConfigUrl}/token-certificates/${hash}`;
        const response = await this.makeRequest('DELETE', url);
        
        return response.data;
    }

    /**
     * Kích hoạt certificate theo hash
     */
    async activateByHash(user: User, hash: string) {
        const url = `${this.ssConfigUrl}/token-certificates/${hash}/activate`;
        const response = await this.makeRequest('PUT', url);
        
        return response.data;
    }

    /**
     * Vô hiệu hóa certificate theo hash
     */
    async disableByHash(user: User, hash: string) {
        const url = `${this.ssConfigUrl}/token-certificates/${hash}/disable`;
        const response = await this.makeRequest('PUT', url);
        
        return response.data;
    }

    /**
     * Lấy danh sách các hành động có thể thực hiện với certificate
     */
    async getAllPossibleActionsByHash(user: User, hash: string) {
        const url = `${this.ssConfigUrl}/token-certificates/${hash}/possible-actions`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Đăng ký certificate theo hash
     */
    async registerByHash(user: User, hash: string) {
        const url = `${this.ssConfigUrl}/token-certificates/${hash}/register`;
        const requestBody = {
            address: this.ssIp
        };

        const response = await this.makeRequest('PUT', url, requestBody);
        
        return response.data;
    }

    /**
     * Hủy đăng ký certificate theo hash
     */
    async unregisterByHash(user: User, hash: string) {
        const url = `${this.ssConfigUrl}/token-certificates/${hash}/unregister`;
        const requestBody = {
            address: this.ssIp
        };

        const response = await this.makeRequest('PUT', url, requestBody);
        
        return response.data;
    }
}
