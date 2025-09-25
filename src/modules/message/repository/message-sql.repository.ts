import { InjectModel } from "@nestjs/sequelize";
import { Message } from "../entities/message.entity";
import { MessageModel } from "../models/message.model";
import { MessageRepository } from "./message-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { Injectable } from "@nestjs/common";

export class MessageSqlRepository 
    extends SqlRepository<Message>
    implements MessageRepository {
        constructor(
            @InjectModel(MessageModel)
            private readonly messageModel: typeof MessageModel,
        ) {
            super(messageModel);
        }
    }