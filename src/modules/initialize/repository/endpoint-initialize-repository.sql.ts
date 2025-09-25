import { InjectModel } from "@nestjs/sequelize";
import { EndpointInitializeModel } from "../models/endpoint-initialize.module.interface";
import { EndpointInitializeRepository } from "./endpoint-initialize-repository.interface";
import { EndpointInitializeEntity } from "../entities/endpoint-initialize.entity";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class EndpointInitializeRepositorySql 
    extends SqlRepository<EndpointInitializeEntity>
    implements EndpointInitializeRepository {
        constructor(
            @InjectModel(EndpointInitializeModel)
            private readonly endpointInitializeModel: typeof EndpointInitializeModel,
        ) {
            super(endpointInitializeModel);
        }
    }