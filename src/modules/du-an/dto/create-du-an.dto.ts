import { IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class CreateDuAnDto {
    @IsString()
    @IsNotEmpty({ message: "Mã dự án không được để trống" })
    @EntityDefinition.field({ label: "Mã dự án", required: true })
    maDuAn: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Tên dự án" })
    tenDuAn?: string;

    @IsString()
    @IsNotEmpty({ message: "Mã loại dự án không được để trống" })
    @EntityDefinition.field({ label: "Mã loại dự án", required: true })
    maLoaiDuAn: string;

    @IsArray()
    @IsNotEmpty({ message: "Danh sách nhân viên phụ trách không được để trống" })
    @EntityDefinition.field({ label: "Danh sách mã nhân viên phụ trách", required: true })
    danhSachNhanVienPhuTrach: string[];

    @IsString()
    @IsNotEmpty({ message: "Mã phòng ban không được để trống" })
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
