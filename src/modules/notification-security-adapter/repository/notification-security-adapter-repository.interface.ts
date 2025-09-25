import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { Notification } from "../entities/notification.entity";

export interface NotificationSecurityAdapterRepository extends BaseRepository<Notification> {}