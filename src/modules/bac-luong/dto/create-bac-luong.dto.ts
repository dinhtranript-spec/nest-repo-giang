import { IsString, IsNotEmpty } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class CreateBacLuongDto {
    @IsString()
    @IsNotEmpty({ message: "Mã bậc lương không được để trống" })
    @EntityDefinition.field({ label: "Mã bậc lương", required: true })
    maBacLuong: string;

    @IsString()
    @IsNotEmpty({ message: "Lương không được để trống" })
    @EntityDefinition.field({ label: "Lương", required: true })
    luong: string;
}
