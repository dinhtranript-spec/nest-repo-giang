import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ViTri } from "../entities/vi-tri.entity";

@Table({
    tableName: Entity.VI_TRI,
    timestamps: true,
})
export class ViTriModel extends Model implements ViTri {
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
        field: '_maViTri'
    })
    maViTri: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_tenViTri'
    })
    tenViTri: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_luong'
    })
    luong: string;
}
