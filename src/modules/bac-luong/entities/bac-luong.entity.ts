import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsString, IsNotEmpty } from "class-validator";

export class BacLuong implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsNotEmpty()
    @EntityDefinition.field({ label: "Mã bậc lương", required: true })
    maBacLuong: string;

    @IsString()
    @IsNotEmpty()
    @EntityDefinition.field({ label: "Lương", required: true })
    luong: string;
}
