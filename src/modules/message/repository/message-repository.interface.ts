import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { Message } from "../entities/message.entity";

export interface MessageRepository extends BaseRepository<Message> {

}