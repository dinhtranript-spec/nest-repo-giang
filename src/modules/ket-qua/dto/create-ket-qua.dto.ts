import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class CreateKetQuaDto {
    @IsString()
    @IsNotEmpty({ message: "Mã kết quả không được để trống" })
    @EntityDefinition.field({ label: "Mã kết quả", required: true })
    maKetQua: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Kết quả" })
    ketQua?: string;
}
