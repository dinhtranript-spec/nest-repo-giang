import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class CreateCongViecNhanVienDto {
    @IsString()
    @IsNotEmpty({ message: "Mã nhân viên không được để trống" })
    @EntityDefinition.field({ label: "Mã nhân viên", required: true })
    maNhanVien: string;

    @IsString()
    @IsNotEmpty({ message: "Mã công việc không được để trống" })
    @EntityDefinition.field({ label: "Mã công việc", required: true })
    maCongViec: string;

    @IsString()
    @IsNotEmpty({ message: "Mã kết quả không được để trống" })
    @EntityDefinition.field({ label: "Mã kết quả", required: true })
    maKetQua: string;

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
