import { MessageController } from "./controller/message.controller";
import { MessageModel } from "./models/message.model";
import { MessageService } from "./services/message.services";
import { Message } from "./entities/message.entity";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { MessageSqlRepository } from "./repository/message-sql.repository";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    SequelizeModule.forFeature([MessageModel])
  ], 
  controllers: [MessageController],
  providers: [
    MessageService,
    RepositoryProvider(Entity.MESSAGE, MessageSqlRepository)
  ],
  exports: [MessageService]
})
export class MessageModule {}




