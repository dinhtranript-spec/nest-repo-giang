import { IsString, IsNotEmpty } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class UpdateNotificationSecurityAdapterDto {
    @IsString()
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @EntityDefinition.field({ label: "Tiêu đề", required: true })
    title: string;

    @IsString()
    @IsNotEmpty({ message: "Mô tả không được để trống" })
    @EntityDefinition.field({ label: "Mô tả", required: true })
    description: string;

    @IsString()
    @IsNotEmpty({ message: "Loại thông báo không được để trống" })
    @EntityDefinition.field({ label: "Loại thông báo", required: true })
    type: string;

    @IsString()
    @IsNotEmpty({ message: "Trạng thái không được để trống" })
    @EntityDefinition.field({ label: "Trạng thái", required: true })
    status?: string;

}