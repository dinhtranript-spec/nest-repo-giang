import { PartialType } from "@nestjs/mapped-types";
import { ServiceDescriptionInitialize } from "../../entities/service-description.entity";
export class ConditionServiceDescriptionDto extends PartialType(ServiceDescriptionInitialize) {}