import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";
import { Configuration } from "@config/configuration";
import { User } from "@module/user/entities/user.entity";
const FormData = require('form-data');

export interface TSADto {
    name: string;
    url: string;
}

@Injectable()
export class SystemService {
    private readonly logger = new Logger(SystemService.name);
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

    private getFileHeaders(acceptType: string = 'application/octet-stream') {
        return {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Accept': acceptType
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

    private generateTimestampFilename(): string {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').replace('T', '_').split('.')[0];
        return `anchor_${timestamp}.xml`;
    }

    /**
     * Lấy thông tin anchor
     */
    async getAnchor(user: User) {
        const url = `${this.ssConfigUrl}/system/anchor`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Upload anchor file
     */
    async uploadAnchor(user: User, file: Express.Multer.File) {
        const url = `${this.ssConfigUrl}/system/anchor`;
        
        const formData = new FormData();
        formData.append('file', file.buffer, {
            filename: file.originalname,
            contentType: 'application/octet-stream'
        });

        const headers = {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Accept': 'application/octet-stream',
            ...formData.getHeaders()
        };

        const response = await this.makeRequest('POST', url, formData, null, headers);
        
        return response.data;
    }

    /**
     * Edit/Update anchor file
     */
    async editAnchor(user: User, file: Express.Multer.File) {
        const url = `${this.ssConfigUrl}/system/anchor`;
        
        const formData = new FormData();
        formData.append('file', file.buffer, {
            filename: file.originalname,
            contentType: 'application/octet-stream'
        });

        const headers = {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Accept': 'application/octet-stream',
            ...formData.getHeaders()
        };

        const response = await this.makeRequest('PUT', url, formData, null, headers);
        
        return response.data;
    }

    /**
     * Download anchor file
     */
    async downloadAnchor(user: User) {
        const url = `${this.ssConfigUrl}/system/anchor/download`;
        const headers = this.getFileHeaders();
        
        const response = await this.makeRequest('GET', url, null, null, headers);
        const filename = this.generateTimestampFilename();
        
        return {
            data: response.data,
            filename: filename,
            contentType: 'application/xml'
        };
    }

    /**
     * Lấy thông tin TLS certificate
     */
    async getTLSCertificate(user: User) {
        const url = `${this.ssConfigUrl}/system/certificate`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Generate TLS certificate
     */
    async generateTLSCertificate(user: User) {
        const url = `${this.ssConfigUrl}/system/certificate`;
        const response = await this.makeRequest('POST', url);
        
        return response.data;
    }

    /**
     * Import TLS certificate
     */
    async importTLSCertificate(user: User, file: Express.Multer.File) {
        const url = `${this.ssConfigUrl}/system/certificate/import`;
        
        const formData = new FormData();
        formData.append('file', file.buffer, {
            filename: file.originalname,
            contentType: 'application/octet-stream'
        });

        const headers = {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Accept': 'application/json',
            ...formData.getHeaders()
        };

        const response = await this.makeRequest('POST', url, formData, null, headers);
        
        return response.data;
    }

    /**
     * Export TLS certificate
     */
    async exportTLSCertificate(user: User) {
        const url = `${this.ssConfigUrl}/system/certificate/export`;
        const headers = this.getFileHeaders('application/gzip');
        
        const response = await this.makeRequest('GET', url, null, null, headers);
        
        return {
            data: response.data,
            filename: 'cert.tar.gz',
            contentType: 'application/gzip'
        };
    }

    /**
     * Lấy danh sách tất cả TSA (Timestamping Services)
     */
    async getAllTSA(user: User) {
        const url = `${this.ssConfigUrl}/system/timestamping-services`;
        const headers = {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        
        const response = await this.makeRequest('GET', url, null, null, headers);
        
        return response.data;
    }

    /**
     * Thêm TSA (Timestamping Service)
     */
    async addTSA(user: User, tsaDto: TSADto) {
        // Validation như trong Java
        if (!tsaDto.name || !tsaDto.url) {
            throw new BadRequestException('Thiếu thông tin name hoặc url');
        }

        const url = `${this.ssConfigUrl}/system/timestamping-services`;
        const headers = {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const requestBody = {
            name: tsaDto.name,
            url: tsaDto.url
        };

        const response = await this.makeRequest('POST', url, requestBody, null, headers);
        
        return response.data;
    }

    /**
     * Xóa TSA (Timestamping Service)
     */
    async deleteTSA(user: User, tsaDto: TSADto) {
        // Validation như trong Java
        if (!tsaDto.name || !tsaDto.url) {
            throw new BadRequestException('Thiếu thông tin name hoặc url');
        }

        const url = `${this.ssConfigUrl}/system/timestamping-services/delete`;
        const headers = {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const requestBody = {
            name: tsaDto.name,
            url: tsaDto.url
        };

        const response = await this.makeRequest('POST', url, requestBody, null, headers);
        
        return response.data;
    }
}
