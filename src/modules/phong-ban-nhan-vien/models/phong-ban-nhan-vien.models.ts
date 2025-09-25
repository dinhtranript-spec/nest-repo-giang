import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { PhongBanNhanVien } from "../entities/phong-ban-nhan-vien.entity";
import { PhongBanModel } from "../../phong-ban/models/phong-ban.models";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { ViTriModel } from "../../vi-tri/models/vi-tri.models";

@Table({
    tableName: Entity.PHONG_BAN_NHAN_VIEN,
    timestamps: true,
})
export class PhongBanNhanVienModel extends Model implements PhongBanNhanVien {
    @StrObjectId()
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        field: '_id'
    })
    _id: string;

    @ForeignKey(() => PhongBanModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maPhongBan'
    })
    maPhongBan: string;

    @BelongsTo(() => PhongBanModel)
    phongBan: PhongBanModel;

    @ForeignKey(() => NhanVienModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maNhanVien'
    })
    maNhanVien: string;

    @BelongsTo(() => NhanVienModel)
    nhanVien: NhanVienModel;

    @ForeignKey(() => ViTriModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maViTri'
    })
    maViTri: string;

    @BelongsTo(() => ViTriModel)
    viTri: ViTriModel;

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
