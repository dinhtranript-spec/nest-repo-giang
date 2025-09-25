import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsString } from "class-validator";

export class ViTri implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã vị trí", required: true })
    maViTri: string;

    @IsString()
    @EntityDefinition.field({ label: "Tên vị trí", required: true })
    tenViTri: string;

    @IsString()
    @EntityDefinition.field({ label: "Lương", required: true })
    luong: string;
}
