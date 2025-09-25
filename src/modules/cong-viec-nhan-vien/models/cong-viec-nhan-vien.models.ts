import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { CongViecNhanVien } from "../entities/cong-viec-nhan-vien.entity";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { CongViecModel } from "../../cong-viec/models/cong-viec.models";
import { KetQuaModel } from "../../ket-qua/models/ket-qua.models";

@Table({
    tableName: Entity.CONG_VIEC_NHAN_VIEN,
    timestamps: true,
})
export class CongViecNhanVienModel extends Model implements CongViecNhanVien {
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

    @ForeignKey(() => CongViecModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_maCongViec'
    })
    maCongViec: string;

    @BelongsTo(() => CongViecModel)
    congViec: CongViecModel;

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
