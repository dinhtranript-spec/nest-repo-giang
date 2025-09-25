import { PartialType } from "@nestjs/mapped-types";
import { Notification } from "../entities/notification.entity";

export class ConditionNotificationDto extends PartialType(Notification) {}