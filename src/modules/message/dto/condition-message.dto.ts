import { PartialType } from "@nestjs/mapped-types";
import { Message } from "../entities/message.entity";

export class ConditionMessageDto extends PartialType(Message) {}