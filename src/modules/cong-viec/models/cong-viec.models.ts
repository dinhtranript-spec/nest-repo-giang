import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { CongViec } from "../entities/cong-viec.entity";

@Table({
    tableName: Entity.CONG_VIEC,
    timestamps: true,
})
export class CongViecModel extends Model implements CongViec {
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
        field: '_maCongViec'
    })
    maCongViec: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: '_ngayBatDauDuKien'
    })
    ngayBatDauDuKien?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: '_ngayKetThucDuKien'
    })
    ngayKetThucDuKien?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: '_ngayBatDauThucTe'
    })
    ngayBatDauThucTe?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: '_ngayKetThucThucTe'
    })
    ngayKetThucThucTe?: string;
}
