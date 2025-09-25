import { BaseEntity } from "@common/interface/base-entity.interface";
import { StrObjectId } from "@common/constant";
import { IsString, IsOptional, IsBoolean, IsNumber, ValidateNested } from "class-validator";
import { ServiceInitializeEntity } from "./service-initialize.entity";
import { Type } from "class-transformer";
import { Organization } from "@module/organization/entities/organization.entity";
export class ServiceDescriptionInitialize implements BaseEntity {
    @StrObjectId()
    _id: string; 

    @IsString()
    _ssId: string; 

    @IsString()
    _description: string; 

    @ValidateNested({ each: true })
    @Type(() => ServiceInitializeEntity)
    _services: ServiceInitializeEntity[]; 

    @ValidateNested({ each: true })
    @Type(() => Organization)
    _organizations: Organization; 
}