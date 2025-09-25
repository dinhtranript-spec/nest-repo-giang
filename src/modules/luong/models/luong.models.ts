import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Luong } from "../entities/luong.entity";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { BacLuongModel } from "../../bac-luong/models/bac-luong.models";

@Table({
    tableName: Entity.LUONG,
    timestamps: true,
})
export class LuongModel extends Model implements Luong {
    @StrObjectId()
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        field: '_id'
    })
    _id: string;

    @ForeignKey(() => NhanVienModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maNhanVien'
    })
    maNhanVien: string;

    @BelongsTo(() => NhanVienModel)
    nhanVien: NhanVienModel;

    @ForeignKey(() => BacLuongModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maBacLuong'
    })
    maBacLuong: string;

    @BelongsTo(() => BacLuongModel)
    bacLuong: BacLuongModel;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_heSoLuong'
    })
    heSoLuong: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_ngayBatDau'
    })
    ngayBatDau: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: '_ngayKetThuc'
    })
    ngayKetThuc?: string;
}
