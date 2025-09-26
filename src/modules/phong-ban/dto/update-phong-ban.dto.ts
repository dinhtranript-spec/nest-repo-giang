import { IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class UpdatePhongBanDto {
    @IsString()
    @IsNotEmpty({ message: "Mã phòng ban không được để trống" })
    @EntityDefinition.field({ label: "Mã phòng ban", required: true })
    maPhongBan: string;

    @IsString()
    @IsNotEmpty({ message: "Tên phòng ban không được để trống" })
    @EntityDefinition.field({ label: "Tên phòng ban", required: true })
    tenPhongBan: string;

    @IsString()
    @IsNotEmpty({ message: "Ngày thành lập không được để trống" })
    @EntityDefinition.field({ label: "Ngày thành lập", required: true })
    ngayThanhLap: string;

    @IsArray()
    @IsOptional()
    @EntityDefinition.field({ label: "Danh sách mã nhân viên trong phòng ban" })
    danhSachNhanVien?: string[];
}
