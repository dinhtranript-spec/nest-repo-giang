import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { KetQua } from "../entities/ket-qua.entity";

@Table({
    tableName: Entity.KET_QUA,
    timestamps: true,
})
export class KetQuaModel extends Model implements KetQua {
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
        field: '_maKetQua'
    })
    maKetQua: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: '_ketQua'
    })
    ketQua?: string;
}
