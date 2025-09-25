import { PartialType } from "@nestjs/mapped-types";
import { EndpointInitializeEntity } from "../../entities/endpoint-initialize.entity";
export class ConditionEndpointDto extends PartialType(EndpointInitializeEntity) {}