import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { NotificationSecurityAdapterService } from "../services/notification-security-adapter.services";
import { CreateNotificationSecurityAdapterDto } from "../dto/create-notification-security-adapter.dto";
import { UpdateNotificationSecurityAdapterDto } from "../dto/update-notification-security-adapter.dto";
import { Notification } from "../entities/notification.entity";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionNotificationDto } from "../dto/condition-notification.dto";

@Controller("notification-security-adapter")
@ApiTags("Notification Security Adapter")
export class NotificationSecurityAdapterController extends BaseControllerFactory<Notification>(
    Notification,
    ConditionNotificationDto,
    CreateNotificationSecurityAdapterDto,
    UpdateNotificationSecurityAdapterDto
) {
    constructor(private readonly notificationSecurityAdapterService: NotificationSecurityAdapterService) {
        super(notificationSecurityAdapterService);
    }
}