import { IsString, IsOptional } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { CreateServiceInitializeDto } from "../service-initialize-dto/create-service-initialize.dto";

export class UpdateServiceDescriptionInitializeDto {
    @IsString()
    @EntityDefinition.field({ label: "ssId" })
    _ssId: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "description" })
    _description?: string;

    @EntityDefinition.field({ label: "services" })
    _services?: CreateServiceInitializeDto[];

    @IsString()
    @EntityDefinition.field({ label: "organizationId" })
    _organizationId: string;
}
