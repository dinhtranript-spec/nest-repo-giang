import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";
import { Configuration } from "@config/configuration";
import { User } from "@module/user/entities/user.entity";

export interface MemberNameQueryParams {
    member_class?: string;
    member_code?: string;
}

@Injectable()
export class MemberNameService {
    private readonly logger = new Logger(MemberNameService.name);
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
     * Lấy member name dựa trên member class và member code
     */
    async getMemberName(user: User, queryParams: MemberNameQueryParams) {
        try {
            const url = `${this.ssConfigUrl}/member-names`;
            const response = await this.makeRequest('GET', url, null, queryParams);
            
            return response.data;
        } catch (error) {
            // Xử lý đặc biệt cho 404 - ẩn error như trong Java
            if (error.response && error.response.status === 404) {
                this.logger.warn(`Member name not found for params: ${JSON.stringify(queryParams)}`);
                return {
                    status: 404,
                    message: 'Member name not found',
                    hide_error: true,
                    data: null
                };
            }
            
            // Ném lại error cho các trường hợp khác
            throw error;
        }
    }
}
