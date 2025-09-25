import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsString } from "class-validator";

export class PhongBan implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã phòng ban", required: true })
    maPhongBan: string;

    @IsString()
    @EntityDefinition.field({ label: "Tên phòng ban", required: true })
    tenPhongBan: string;

    @IsString()
    @EntityDefinition.field({ label: "Ngày thành lập", required: true })
    ngayThanhLap: string;
}
