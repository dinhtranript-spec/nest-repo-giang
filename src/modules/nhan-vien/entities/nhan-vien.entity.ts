import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { IsString, IsOptional } from "class-validator";

export class NhanVien implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "Mã nhân viên", required: true })
    maNhanVien: string;

    @IsString()
    @EntityDefinition.field({ label: "Họ và tên", required: true })
    hoVaTen: string;

    @IsString()
    @EntityDefinition.field({ label: "Sinh nhật", required: true })
    sinhNhat: string;

    @IsString()
    @EntityDefinition.field({ label: "Ngày tuyển dụng", required: true })
    ngayTuyenDung: string;

    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Số điện thoại" })
    soDienThoai?: string;
}
