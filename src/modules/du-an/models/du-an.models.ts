import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { DuAn } from "../entities/du-an.entity";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { LoaiDuAnModel } from "../../loai-du-an/models/loai-du-an.models";
import { PhongBanModel } from "../../phong-ban/models/phong-ban.models";

@Table({
    tableName: Entity.DU_AN,
    timestamps: true,
})
export class DuAnModel extends Model implements DuAn {
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
        field: '_maDuAn'
    })
    maDuAn: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: '_tenDuAn'
    })
    tenDuAn?: string;

    @ForeignKey(() => LoaiDuAnModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maLoaiDuAn'
    })
    maLoaiDuAn: string;

    @BelongsTo(() => LoaiDuAnModel)
    loaiDuAn: LoaiDuAnModel;

    @ForeignKey(() => NhanVienModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maNhanVien'
    })
    maNhanVien: string;

    @BelongsTo(() => NhanVienModel)
    nhanVien: NhanVienModel;

    @ForeignKey(() => PhongBanModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maPhongBan'
    })
    maPhongBan: string;

    @BelongsTo(() => PhongBanModel)
    phongBan: PhongBanModel;

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
