import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { NhanVien } from "../entities/nhan-vien.entity";

@Table({
    tableName: Entity.NHAN_VIEN,
    timestamps: true,
})
export class NhanVienModel extends Model implements NhanVien {
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
        field: '_maNhanVien'
    })
    maNhanVien: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_hoVaTen'
    })
    hoVaTen: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_sinhNhat'
    })
    sinhNhat: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_ngayTuyenDung'
    })
    ngayTuyenDung: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: '_soDienThoai'
    })
    soDienThoai?: string;
}
