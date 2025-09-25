import { IsString, IsNotEmpty } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class CreateLoaiDuAnDto {
    @IsString()
    @IsNotEmpty({ message: "Mã loại dự án không được để trống" })
    @EntityDefinition.field({ label: "Mã loại dự án", required: true })
    maLoaiDuAn: string;

    @IsString()
    @IsNotEmpty({ message: "Tên loại dự án không được để trống" })
    @EntityDefinition.field({ label: "Tên loại dự án", required: true })
    tenLoaiDuAn: string;

    @IsString()
    @IsNotEmpty({ message: "Số lượng người tối đa không được để trống" })
    @EntityDefinition.field({ label: "Số lượng người tối đa", required: true })
    soLuongNguoiToiDa: string;
}
