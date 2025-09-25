import { StrObjectId } from "@common/constant";
import { Notification } from "../entities/notification.entity";
import { Entity } from "@module/repository";
import {
    Column,
    DataType,
    Model,
    Table
} from "sequelize-typescript";

@Table({
    tableName: Entity.NOTIFICATION_SECURITY_ADAPTER,
    timestamps: true,
})
export class NotificationModel extends Model implements Notification {
    @StrObjectId()
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        field: '_id'
    })
    _id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: '_title'
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: '_type'
    })
    type: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: '_description'
    })
    description: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: '_status'
    })
    status?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: '_createAt',
        defaultValue: DataType.NOW
    })
    createAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: '_updateAt',
        defaultValue: DataType.NOW
    })
    updateAt: Date;
}