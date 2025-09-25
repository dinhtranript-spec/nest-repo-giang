import { IsString, IsOptional } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ServiceInitializeEntity } from "../../entities/service-initialize.entity";
import { PartialType } from "@nestjs/swagger";
export class ConditionServiceInitializeDto  extends PartialType(ServiceInitializeEntity) {}