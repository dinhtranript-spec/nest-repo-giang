import { Configuration } from "@config/configuration";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { NOTIFICATION_TYPES, NotificationType } from "../common/constants";

@Injectable()
export class NotificationUtilsService {
    private readonly logger = new Logger(NotificationUtilsService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService<Configuration>
    ) {}

    async sendNotiToCS(type: NotificationType | string, title: string, description: string): Promise<void> {
        try {
            const ssConfig = this.configService.get("ss", { infer: true });
            const subsystemCode = ssConfig.manageId.replace(/:/g, "/");
            const url = `${ssConfig.baseUrl}/r1/${subsystemCode}/${ssConfig.manageServiceCode}`;
            const xRoadClient = ssConfig.id.replace(/:/g, "/");
            
            const headers = {
                "X-Road-Client": xRoadClient,
                "Content-Type": "application/json"
            };

            let finalUrl: string;
            let body: any = null;

            if (type.toUpperCase() === NOTIFICATION_TYPES.SS_CHANGE) {
                finalUrl = `${url}/ss-change/${ssConfig.id}`;
            } else {
                finalUrl = `${url}/notifications`;
                body = {
                    type,
                    title,
                    description
                };
            }

            this.logger.log(`Sending notification to CS: ${finalUrl}`);
            
            if (body) {
                // POST request với body
                await lastValueFrom(
                    this.httpService.post(finalUrl, body, { headers })
                );
            } else {
                // POST request không có body
                await lastValueFrom(
                    this.httpService.post(finalUrl, null, { headers })
                );
            }

            this.logger.log(`Notification sent successfully to CS`);
        } catch (error) {
            this.logger.error(`Failed to send notification to CS: ${error.message}`, error.stack);
            throw error;
        }
    }
}
