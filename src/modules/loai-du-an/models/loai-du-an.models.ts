import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { LoaiDuAn } from "../entities/loai-du-an.entity";

@Table({
    tableName: Entity.LOAI_DU_AN,
    timestamps: true,
})
export class LoaiDuAnModel extends Model implements LoaiDuAn {
    @StrObjectId()
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        field: '_id'
    })
    _id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        field: '_maLoaiDuAn'
    })
    maLoaiDuAn: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_tenLoaiDuAn'
    })
    tenLoaiDuAn: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_soLuongNguoiToiDa'
    })
    soLuongNguoiToiDa: string;
}
