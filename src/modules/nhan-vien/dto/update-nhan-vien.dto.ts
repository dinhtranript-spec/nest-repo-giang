import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class UpdateNhanVienDto {
    @IsString()
    @IsNotEmpty({ message: "Mã nhân viên không được để trống" })
    @EntityDefinition.field({ label: "Mã nhân viên", required: true })
    maNhanVien: string;

    @IsString()
    @IsNotEmpty({ message: "Họ và tên không được để trống" })
    @EntityDefinition.field({ label: "Họ và tên", required: true })
    hoVaTen: string;

    @IsString()
    @IsNotEmpty({ message: "Sinh nhật không được để trống" })
    @EntityDefinition.field({ label: "Sinh nhật", required: true })
    sinhNhat: string;

    @IsString()
    @IsNotEmpty({ message: "Ngày tuyển dụng không được để trống" })
    @EntityDefinition.field({ label: "Ngày tuyển dụng", required: true })
    ngayTuyenDung: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Số điện thoại" })
    soDienThoai?: string;
}
