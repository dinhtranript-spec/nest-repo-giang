import { StrObjectId } from "@common/constant";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { IsString, IsOptional, IsBoolean, IsNumber } from "class-validator";
import { EndpointInitializeEntity } from "./endpoint-initialize.entity";
export class ServiceInitializeEntity implements BaseEntity {
    @StrObjectId()
    _id: string; 

    @IsString()
    _ssId: string; 

    @IsBoolean()
    _isPublic: boolean; 

    @IsBoolean()
    _isForCitizen: boolean  ; 

    @IsString()
    _type: string; 

    @IsString()
    _status: string; 
    
    _endpoints: EndpointInitializeEntity[]; 
}
