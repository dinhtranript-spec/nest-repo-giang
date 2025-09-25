import { IsString, IsNotEmpty } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class UpdateViTriDto {
    @IsString()
    @IsNotEmpty({ message: "Mã vị trí không được để trống" })
    @EntityDefinition.field({ label: "Mã vị trí", required: true })
    maViTri: string;

    @IsString()
    @IsNotEmpty({ message: "Tên vị trí không được để trống" })
    @EntityDefinition.field({ label: "Tên vị trí", required: true })
    tenViTri: string;

    @IsString()
    @IsNotEmpty({ message: "Lương không được để trống" })
    @EntityDefinition.field({ label: "Lương", required: true })
    luong: string;
}
