import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { CongDoan } from "../entities/cong-doan.entity";
import { DuAnModel } from "../../du-an/models/du-an.models";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { KetQuaModel } from "../../ket-qua/models/ket-qua.models";

@Table({
    tableName: Entity.CONG_DOAN,
    timestamps: true,
})
export class CongDoanModel extends Model implements CongDoan {
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
        field: '_maCongDoan'
    })
    maCongDoan: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maCongDoanTruocDo'
    })
    maCongDoanTruocDo: string;

    @ForeignKey(() => DuAnModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maDuAn'
    })
    maDuAn: string;

    @BelongsTo(() => DuAnModel)
    duAn: DuAnModel;

    @ForeignKey(() => NhanVienModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maNhanVien'
    })
    maNhanVien: string;

    @BelongsTo(() => NhanVienModel)
    nhanVien: NhanVienModel;

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

    @ForeignKey(() => KetQuaModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maKetQua'
    })
    maKetQua: string;

    @BelongsTo(() => KetQuaModel)
    ketQua: KetQuaModel;
}
