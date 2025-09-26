import { IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class UpdateCongViecDto {
    @IsString()
    @IsNotEmpty({ message: "Mã công việc không được để trống" })
    @EntityDefinition.field({ label: "Mã công việc", required: true })
    maCongViec: string;

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

    @IsArray()
    @IsOptional()
    @EntityDefinition.field({ label: "Danh sách mã nhân viên thực hiện" })
    danhSachNhanVien?: string[];
}
