import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { IsString, IsOptional, IsBoolean, IsNumber } from "class-validator";

export class EndpointInitializeEntity implements BaseEntity {
    @StrObjectId()
    _id: string; 

    @IsString()
    _ssId : string; 

    @IsString()
    _name : string; 

    @IsString()
    _method:   string; 

    @IsString()
    _path: string; 

    @IsString()
    _adapter_path: string; 

    @IsString()
    _description: string; 

    @IsString()
    _inputDescription: string; 

    @IsString()
    _outputDescription: string; 

    @IsString()
    _inputType: string; 

    @IsString()
    _outputType: string; 

    @IsBoolean()
    _isPublic: boolean; 

    @IsBoolean()
    _isForCitizen: boolean; 

    @IsString()
    _type: string; 

    @IsString() 
    _status: string; 
    
}