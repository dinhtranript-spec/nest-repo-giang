import { InjectModel } from "@nestjs/sequelize";
import { NotificationModel } from "../models/notification.module";
import { Notification } from "../entities/notification.entity";
import { NotificationSecurityAdapterRepository } from "./notification-security-adapter-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class NotificationSecurityAdapterRepositorySql 
    extends SqlRepository<Notification>
    implements NotificationSecurityAdapterRepository {
        constructor(
            @InjectModel(NotificationModel)
            private readonly notificationModel: typeof NotificationModel,
        ) {
            super(notificationModel);
        }
    }