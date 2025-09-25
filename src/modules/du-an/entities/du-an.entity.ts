import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsString, IsOptional } from "class-validator";

export class DuAn implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã dự án", required: true })
    maDuAn: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Tên dự án" })
    tenDuAn?: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã loại dự án", required: true })
    maLoaiDuAn: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã nhân viên", required: true })
    maNhanVien: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã phòng ban", required: true })
    maPhongBan: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày bắt đầu dự kiến" })
    ngayBatDauDuKien?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày kết thúc dự kiến" })
    ngayKetThucDuKien?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày bắt đầu thực tế" })
    ngayBatDauThucTe?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày kết thúc thực tế" })
    ngayKetThucThucTe?: string;
}
