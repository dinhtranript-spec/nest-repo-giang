import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsString, IsOptional } from "class-validator";

export class PhongBanNhanVien implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã phòng ban", required: true })
    maPhongBan: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã nhân viên", required: true })
    maNhanVien: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã vị trí", required: true })
    maViTri: string;

    @IsString()
    @EntityDefinition.field({ label: "Ngày bắt đầu", required: true })
    ngayBatDau: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày kết thúc" })
    ngayKetThuc?: string;
}
