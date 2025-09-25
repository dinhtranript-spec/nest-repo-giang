import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsString, IsOptional } from "class-validator";

export class KetQua implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã kết quả", required: true })
    maKetQua: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Kết quả" })
    ketQua?: string;
}
