import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class CreatePhongBanNhanVienDto {
    @IsString()
    @IsNotEmpty({ message: "Mã phòng ban không được để trống" })
    @EntityDefinition.field({ label: "Mã phòng ban", required: true })
    maPhongBan: string;

    @IsString()
    @IsNotEmpty({ message: "Mã nhân viên không được để trống" })
    @EntityDefinition.field({ label: "Mã nhân viên", required: true })
    maNhanVien: string;

    @IsString()
    @IsNotEmpty({ message: "Mã vị trí không được để trống" })
    @EntityDefinition.field({ label: "Mã vị trí", required: true })
    maViTri: string;

    @IsString()
    @IsNotEmpty({ message: "Ngày bắt đầu không được để trống" })
    @EntityDefinition.field({ label: "Ngày bắt đầu", required: true })
    ngayBatDau: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Ngày kết thúc" })
    ngayKetThuc?: string;
}
