import { InjectModel } from "@nestjs/sequelize";
import { ServiceInitializeModel } from "../models/service-initialize.module";
import { ServiceRepository } from "./service-repository.interface";
import { ServiceInitializeEntity } from "../entities/service-initialize.entity";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ServiceRepositorySql 
    extends SqlRepository<ServiceInitializeEntity>
    implements ServiceRepository {
        constructor(
            @InjectModel(ServiceInitializeModel)
            private readonly serviceInitializeModel: typeof ServiceInitializeModel,
        ) {
            super(serviceInitializeModel);
        }
    }