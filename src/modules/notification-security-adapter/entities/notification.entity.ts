import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Column, DataType, Model, Table, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { IsString, IsOptional } from "class-validator";

@Table({ tableName: "_notification" })
export class Notification extends Model implements BaseEntity {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "title", required: true })
    @Column({ type: DataType.TEXT, allowNull: false })
    title: string;

    @IsString()
    @EntityDefinition.field({ label: "type", required: true })
    @Column({ type: DataType.TEXT, allowNull: false })
    type: string;

    @IsString()
    @EntityDefinition.field({ label: "description", required: true })
    @Column({ type: DataType.TEXT, allowNull: false })
    description: string;

    @IsString()
    @IsOptional()
    @Column({ type: DataType.TEXT, allowNull: true })
    status?: string;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    createAt: Date;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    updateAt: Date;
}