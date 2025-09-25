import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { BacLuong } from "../entities/bac-luong.entity";

@Table({
    tableName: Entity.BAC_LUONG,
    timestamps: true,
})
export class BacLuongModel extends Model implements BacLuong {
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
        field: '_maBacLuong'
    })
    maBacLuong: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_luong'
    })
    luong: string;
}
