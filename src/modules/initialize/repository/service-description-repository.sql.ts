import { InjectModel } from "@nestjs/sequelize";
import { ServiceDescriptionModel } from "../models/service-description.module";
import { ServiceDescriptionRepository } from "./service-description-repository.interface";
import { ServiceDescriptionInitialize } from "../entities/service-description.entity";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ServiceDescriptionRepositorySql 
    extends SqlRepository<ServiceDescriptionInitialize>
    implements ServiceDescriptionRepository {
        constructor(
            @InjectModel(ServiceDescriptionModel)
            private readonly serviceDescriptionModel: typeof ServiceDescriptionModel,
        ) {
            super(serviceDescriptionModel);
        }
    }