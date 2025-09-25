import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { CongDoanNhanVien } from "../entities/cong-doan-nhan-vien.entity";
import { CongDoanModel } from "../../cong-doan/models/cong-doan.models";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { KetQuaModel } from "../../ket-qua/models/ket-qua.models";
import { DuAnModel } from "../../du-an/models/du-an.models";

@Table({
    tableName: Entity.CONG_DOAN_NHAN_VIEN,
    timestamps: true,
})
export class CongDoanNhanVienModel extends Model implements CongDoanNhanVien {
    @StrObjectId()
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        field: '_id'
    })
    _id: string;

    @ForeignKey(() => CongDoanModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maCongDoan'
    })
    maCongDoan: string;

    @BelongsTo(() => CongDoanModel)
    congDoan: CongDoanModel;

    @ForeignKey(() => NhanVienModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maNhanVien'
    })
    maNhanVien: string;

    @BelongsTo(() => NhanVienModel)
    nhanVien: NhanVienModel;

    @ForeignKey(() => KetQuaModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maKetQua'
    })
    maKetQua: string;

    @BelongsTo(() => KetQuaModel)
    ketQua: KetQuaModel;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_ngayBatDauDuKien'
    })
    ngayBatDauDuKien: string;

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

    @ForeignKey(() => DuAnModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maDuAn'
    })
    maDuAn: string;

    @BelongsTo(() => DuAnModel)
    duAn: DuAnModel;
}
