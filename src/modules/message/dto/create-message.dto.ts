import { IsString, IsArray, IsOptional, IsNotEmpty } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty({ message: "Tiêu đề không được để trống" })
    @EntityDefinition.field({ label: "Tiêu đề", required: true })
    title: string;

    @IsString()
    @IsNotEmpty({ message: "Mô tả không được để trống" })
    @EntityDefinition.field({ label: "Mô tả", required: true })
    description: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Nội dung" })
    content?: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Trạng thái" })
    status?: string;

    @IsArray()
    @IsOptional()
    @EntityDefinition.field({ label: "Danh sách file đính kèm" })
    filePaths?: string[];

    @IsString()
    @IsNotEmpty({ message: "ID tổ chức gửi không được để trống" })
    @EntityDefinition.field({ label: "Tổ chức gửi", required: true })
    fromId: string;

    @IsString()
    @IsNotEmpty({ message: "ID tổ chức nhận không được để trống" })
    @EntityDefinition.field({ label: "Tổ chức nhận", required: true })
    toId: string;
}
