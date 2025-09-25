import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class CreateLuongDto {
    @IsString()
    @IsNotEmpty({ message: "Mã nhân viên không được để trống" })
    @EntityDefinition.field({ label: "Mã nhân viên", required: true })
    maNhanVien: string;

    @IsString()
    @IsNotEmpty({ message: "Mã bậc lương không được để trống" })
    @EntityDefinition.field({ label: "Mã bậc lương", required: true })
    maBacLuong: string;

    @IsString()
    @IsNotEmpty({ message: "Hệ số lương không được để trống" })
    @EntityDefinition.field({ label: "Hệ số lương", required: true })
    heSoLuong: string;

    @IsString()
    @IsNotEmpty({ message: "Ngày bắt đầu không được để trống" })
    @EntityDefinition.field({ label: "Ngày bắt đầu", required: true })
    ngayBatDau: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày kết thúc" })
    ngayKetThuc?: string;
}
