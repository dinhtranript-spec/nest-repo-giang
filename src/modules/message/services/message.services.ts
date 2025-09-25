import { BaseService } from "@config/service/base.service"
import { Message } from "../entities/message.entity";
import { MessageRepository } from "../repository/message-repository.interface";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class MessageService extends BaseService<
    Message,
    MessageRepository
> {
   constructor(
    @InjectRepository(Entity.MESSAGE)
    private readonly messageRepository: MessageRepository
   ){
    super(messageRepository);
   }
}