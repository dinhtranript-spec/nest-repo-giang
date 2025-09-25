import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { PhongBan } from "../entities/phong-ban.entity";

@Table({
    tableName: Entity.PHONG_BAN,
    timestamps: true,
})
export class PhongBanModel extends Model implements PhongBan {
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
        field: '_maPhongBan'
    })
    maPhongBan: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_tenPhongBan'
    })
    tenPhongBan: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_ngayThanhLap'
    })
    ngayThanhLap: string;
}
