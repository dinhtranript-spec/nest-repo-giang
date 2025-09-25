import { NotificationSecurityAdapterController } from "./controller/notification-security-adapter.controller";
import { NotificationSecurityAdapterService } from "./services/notification-security-adapter.services";
import { NotificationUtilsService } from "./services/notification-utils.service";
import { NotificationModel } from "./models/notification.module";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { HttpModule } from "@nestjs/axios";
import { NotificationSecurityAdapterRepositorySql } from "./repository/notification-security-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([NotificationModel]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [NotificationSecurityAdapterController],
  providers: [
    NotificationSecurityAdapterService,
    NotificationUtilsService,
    RepositoryProvider(Entity.NOTIFICATION_SECURITY_ADAPTER, NotificationSecurityAdapterRepositorySql)
  ],
  exports: [NotificationSecurityAdapterService, NotificationUtilsService]
})
export class NotificationSecurityAdapterModule {}