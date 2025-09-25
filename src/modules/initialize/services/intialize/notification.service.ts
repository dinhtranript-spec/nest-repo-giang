import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";
import { Configuration } from "@config/configuration";
import { User } from "@module/user/entities/user.entity";

export interface NotificationQueryParams {
    type?: string;
    start_time?: string;
    end_time?: string;
}

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
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
     * Lấy alerts từ notifications
     * Tương ứng với endpoint /notifications/alerts trong Java
     */
    async getAlerts(user: User) {
        const url = `${this.ssConfigUrl}/notifications/alerts`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Lấy session status từ notifications
     * Tương ứng với endpoint /notifications/session-status trong Java
     */
    async getSessionStatus(user: User) {
        const url = `${this.ssConfigUrl}/notifications/session-status`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Lấy danh sách notifications (generic)
     * Giữ lại cho tương lai nếu cần
     */
    async getNotifications(user: User, queryParams: NotificationQueryParams = {}) {
        const url = `${this.ssConfigUrl}/notifications`;
        const response = await this.makeRequest('GET', url, null, queryParams);
        
        return response.data;
    }

    /**
     * Lấy notification theo ID
     */
    async getNotificationById(user: User, id: string) {
        const url = `${this.ssConfigUrl}/notifications/${id}`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Đánh dấu notification đã đọc
     */
    async markNotificationAsRead(user: User, id: string) {
        const url = `${this.ssConfigUrl}/notifications/${id}/mark-as-read`;
        const response = await this.makeRequest('PUT', url);
        
        return response.data;
    }

    /**
     * Xóa notification
     */
    async deleteNotification(user: User, id: string) {
        const url = `${this.ssConfigUrl}/notifications/${id}`;
        const response = await this.makeRequest('DELETE', url);
        
        return response.data;
    }
}
