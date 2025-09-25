import { BaseService } from "@config/service/base.service";
import { Notification } from "../entities/notification.entity";
import { NotificationSecurityAdapterRepository } from "../repository/notification-security-adapter-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";
import { NotificationUtilsService } from "./notification-utils.service";
import { NotificationType } from "../common/constants";

@Injectable()
export class NotificationSecurityAdapterService extends BaseService<
    Notification,
    NotificationSecurityAdapterRepository
> {
    constructor(
        @InjectRepository(Entity.NOTIFICATION_SECURITY_ADAPTER)
        private readonly notificationSecurityAdapterRepository: NotificationSecurityAdapterRepository,
        private readonly notificationUtilsService: NotificationUtilsService
    ) {
        super(notificationSecurityAdapterRepository);
    }

    async sendNotificationToCS(type: NotificationType | string, title: string, description: string): Promise<void> {
        return this.notificationUtilsService.sendNotiToCS(type, title, description);
    }
}