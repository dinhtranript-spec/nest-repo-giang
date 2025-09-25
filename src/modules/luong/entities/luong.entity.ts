import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsString, IsOptional } from "class-validator";

export class Luong implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã nhân viên", required: true })
    maNhanVien: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã bậc lương", required: true })
    maBacLuong: string;

    @IsString()
    @EntityDefinition.field({ label: "Hệ số lương", required: true })
    heSoLuong: string;

    @IsString()
    @EntityDefinition.field({ label: "Ngày bắt đầu", required: true })
    ngayBatDau: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày kết thúc" })
    ngayKetThuc?: string;
}
