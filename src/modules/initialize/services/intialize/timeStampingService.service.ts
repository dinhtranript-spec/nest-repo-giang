import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";
import { Configuration } from "@config/configuration";
import { User } from "@module/user/entities/user.entity";

@Injectable()
export class TimestampingService {
    private readonly logger = new Logger(TimestampingService.name);
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
     * Lấy danh sách tất cả timestamping services
     * Tương ứng với endpoint GET /timestamping-services trong Java
     */
    async getAll(user: User) {
        const url = `${this.ssConfigUrl}/timestamping-services`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }
}
