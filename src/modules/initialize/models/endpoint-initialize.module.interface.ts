import { StrObjectId } from "@common/constant";
import { EndpointInitializeEntity } from "../entities/endpoint-initialize.entity";
import { Entity } from "@module/repository"
import {
    Column, 
    DataType,
    Model,
    Table,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    HasMany,
    AllowNull,
    Default,
    Unique,
    Index,
} from "sequelize-typescript";

@Table({
    tableName: Entity.ENDPOINT_INITIALIZE,
    timestamps: true,
})
export class EndpointInitializeModel extends Model<EndpointInitializeEntity> {
    @StrObjectId()
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
        field: "_name",
    })
    _name: string; 

    @Column({
        type: DataType.STRING,
        field: "_method",
    })
    _method: string; 

    @Column({
        type: DataType.STRING,
        field: "_path",
    })
    _path: string; 

    @Column({
        type: DataType.STRING,
        field: "_adapter_path",
    })
    _adapter_path: string; 

    @Column({
        type: DataType.STRING,
        field: "_description",
    })
    _description: string; 
    
    @Column({
        type: DataType.STRING,
        field: "_inputDescription",
    })
    _inputDescription: string; 

    @Column({
        type: DataType.STRING,
        field: "_outputDescription",
    })
    _outputDescription: string; 
    
    @Column({
        type: DataType.STRING,
        field: "_inputType",
    })
    _inputType: string; 

    @Column({
        type: DataType.STRING,
        field: "_outputType",
    })
    _outputType: string; 

    @Column({
        type: DataType.BOOLEAN,
        field: "_isPublic",
    })
    _isPublic: boolean; 
    
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
    
    
}