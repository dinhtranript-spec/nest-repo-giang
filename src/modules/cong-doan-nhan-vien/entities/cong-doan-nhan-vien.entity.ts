import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsString, IsOptional } from "class-validator";

export class CongDoanNhanVien implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã công đoạn", required: true })
    maCongDoan: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã nhân viên", required: true })
    maNhanVien: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã kết quả", required: true })
    maKetQua: string;

    @IsString()
    @EntityDefinition.field({ label: "Ngày bắt đầu dự kiến", required: true })
    ngayBatDauDuKien: string;

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

    @IsString()
    @EntityDefinition.field({ label: "Mã dự án", required: true })
    maDuAn: string;
}
