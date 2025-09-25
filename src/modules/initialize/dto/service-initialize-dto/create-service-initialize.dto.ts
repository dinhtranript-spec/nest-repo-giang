import { IsString, IsBoolean, IsOptional, IsArray } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { CreateEndpointInitializeDto } from "../enpoint-initialize-dto/create-endpoint.dto";

export class CreateServiceInitializeDto {
    @IsString()
    @EntityDefinition.field({ label: "ssId" })
    _ssId: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "description" })
    _description?: string;

    @IsArray()
    @EntityDefinition.field({ label: "endpoints" })
    _endpoints?: CreateEndpointInitializeDto[];

    @IsBoolean()
    @EntityDefinition.field({ label: "isPublic" })
    _isPublic: boolean;

    @IsBoolean()
    @EntityDefinition.field({ label: "isForCitizen" })
    _isForCitizen: boolean;

    @IsString()
    @EntityDefinition.field({ label: "type" })
    _type: string;

    @IsString()
    @EntityDefinition.field({ label: "status" })
    _status: string;
}
