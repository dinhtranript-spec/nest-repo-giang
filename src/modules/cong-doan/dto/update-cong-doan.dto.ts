import { IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class UpdateCongDoanDto {
    @IsString()
    @IsNotEmpty({ message: "Mã công đoạn không được để trống" })
    @EntityDefinition.field({ label: "Mã công đoạn", required: true })
    maCongDoan: string;

    @IsString()
    @IsNotEmpty({ message: "Mã công đoạn trước đó không được để trống" })
    @EntityDefinition.field({ label: "Mã công đoạn trước đó", required: true })
    maCongDoanTruocDo: string;

    @IsString()
    @IsNotEmpty({ message: "Mã dự án không được để trống" })
    @EntityDefinition.field({ label: "Mã dự án", required: true })
    maDuAn: string;

    @IsArray()
    @IsNotEmpty({ message: "Danh sách nhân viên thực hiện không được để trống" })
    @EntityDefinition.field({ label: "Danh sách mã nhân viên thực hiện", required: true })
    danhSachNhanVien: string[];

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

    @IsString()
    @IsNotEmpty({ message: "Mã kết quả không được để trống" })
    @EntityDefinition.field({ label: "Mã kết quả", required: true })
    maKetQua: string;
}
