import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class CreateCongDoanNhanVienDto {
    @IsString()
    @IsNotEmpty({ message: "Mã công đoạn không được để trống" })
    @EntityDefinition.field({ label: "Mã công đoạn", required: true })
    maCongDoan: string;

    @IsString()
    @IsNotEmpty({ message: "Mã nhân viên không được để trống" })
    @EntityDefinition.field({ label: "Mã nhân viên", required: true })
    maNhanVien: string;

    @IsString()
    @IsNotEmpty({ message: "Mã kết quả không được để trống" })
    @EntityDefinition.field({ label: "Mã kết quả", required: true })
    maKetQua: string;

    @IsString()
    @IsNotEmpty({ message: "Ngày bắt đầu dự kiến không được để trống" })
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
    @IsNotEmpty({ message: "Mã dự án không được để trống" })
    @EntityDefinition.field({ label: "Mã dự án", required: true })
    maDuAn: string;
}
