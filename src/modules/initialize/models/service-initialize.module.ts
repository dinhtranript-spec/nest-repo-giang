import { ServiceInitializeEntity } from "../entities/service-initialize.entity";
import { StrObjectId } from "@common/constant";
import { Entity } from "@module/repository";
import {
    Column, 
    DataType,
    Model,
    Table,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";
import { EndpointInitializeModel } from "./endpoint-initialize.module.interface";
import { ServiceDescriptionModel } from "./service-description.module";

@Table({
    tableName: Entity.SERVICE_INITIALIZE,
    timestamps: true,
})
export class ServiceInitializeModel extends Model<ServiceInitializeEntity> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        field: "_id",
    })
    _id: string; 

    @Column({
        type: DataType.STRING,
        field: "_ssId",
    })
    _ssId: string; 
    
    @Column({
        type: DataType.STRING,
        field: "_description",
    })
    _description: string; 

    @HasMany(() => EndpointInitializeModel, { foreignKey: "_serviceId" })
    endpoints: EndpointInitializeModel[];

    @Column({
        type: DataType.BOOLEAN,
        field: "_isPublish",
    })
    _isPublish: boolean; 

    @Column({
        type: DataType.BOOLEAN,
        field: "_isForCitizen",
    })
    _isForCitizen: boolean; 

    @Column({
        type: DataType.STRING,
        field: "_type",
    })
    _type: string; 

    @Column({
        type: DataType.STRING,
        field: "_status",
    })
    _status: string; 

    @ForeignKey(() => ServiceDescriptionModel)
    @Column({
        type: DataType.STRING,
        field: "_descriptionId",
    })
    _serviceDescriptionId: string; 

    @BelongsTo(()=> ServiceDescriptionModel, {foreignKey: "_descriptionId"})
    serviceDescription: ServiceDescriptionModel; 
}