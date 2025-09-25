import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsString } from "class-validator";

export class LoaiDuAn implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã loại dự án", required: true })
    maLoaiDuAn: string;

    @IsString()
    @EntityDefinition.field({ label: "Tên loại dự án", required: true })
    tenLoaiDuAn: string;

    @IsString()
    @EntityDefinition.field({ label: "Số lượng người tối đa", required: true })
    soLuongNguoiToiDa: string;
}
