import { StrObjectId } from "@common/constant";
import { Message } from "../entities/message.entity";
import { Entity } from "@module/repository";
import {
    Column,
    DataType,
    Model,
    Table
} from "sequelize-typescript";

@Table({
    tableName: Entity.MESSAGE,
    timestamps: true,
})
export class MessageModel extends Model implements Message {
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
        field: '_description'
    })
    description: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: '_content'
    })
    content: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: '_status'
    })
    status: string;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true,
        field: '_filePaths'
    })
    filePaths: string[];

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_fromId'
    })
    fromId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: '_toId'
    })
    toId: string;

    // Virtual fields cho relationship (sẽ được populate ở service)
    from?: any;
    to?: any;
}