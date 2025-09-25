import { ServiceDescriptionInitialize } from "../entities/service-description.entity";
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
import { OrganizationModel } from "@module/organization/models/organization.models";
import { ServiceInitializeModel } from "./service-initialize.module";

@Table({
    tableName: Entity.SERVICE_DESCRIPTION_INITIALIZE,
    timestamps: true,
})
export class ServiceDescriptionModel extends Model<ServiceDescriptionInitialize> {
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
    
    @HasMany(()=> ServiceInitializeModel, {foreignKey: "_serviceDescriptionId"})
    services: ServiceInitializeModel[]; 

    @ForeignKey(()=> OrganizationModel)
    @Column({
        type: DataType.STRING,
        field: "_organizationId",
    })
    _organizationId: string; 

    @BelongsTo(()=> OrganizationModel)
    organization: OrganizationModel; 
}
