import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class UpdateEndpointInitializeDto {
    @IsString()
    @EntityDefinition.field({ label: "ssId" })
    _ssId: string;

    @IsString()
    @EntityDefinition.field({ label: "name" })
    _name: string;

    @IsString()
    @EntityDefinition.field({ label: "method" })
    _method: string;

    @IsString()
    @EntityDefinition.field({ label: "path" })
    _path: string;

    @IsString()
    @EntityDefinition.field({ label: "adapterPath" })
    _adapter_path: string;

    @IsString()
    @EntityDefinition.field({ label: "description" })
    _description: string;

    @IsString()
    @EntityDefinition.field({ label: "inputDescription" })
    _inputDescription: string;

    @IsString()
    @EntityDefinition.field({ label: "outputDescription" })
    _outputDescription: string;

    @IsString()
    @EntityDefinition.field({ label: "inputType" })
    _inputType: string;

    @IsString()
    @EntityDefinition.field({ label: "outputType" })
    _outputType: string;

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