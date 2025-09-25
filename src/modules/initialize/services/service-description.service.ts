import { BaseService } from "@config/service/base.service";
import { ServiceDescriptionInitialize } from "../entities/service-description.entity";
import { Injectable } from "@nestjs/common";
import { Entity } from "@module/repository";
import { ServiceDescriptionRepository } from "../repository/service-description-repository.interface";
import { InjectRepository } from "@module/repository/common/repository";

@Injectable()
export class ServiceDescriptionService extends BaseService<
    ServiceDescriptionInitialize,
    ServiceDescriptionRepository
> {
    constructor(
        @InjectRepository(Entity.SERVICE_DESCRIPTION_INITIALIZE)
        private readonly serviceDescriptionRepository: ServiceDescriptionRepository
    ) {
        super(serviceDescriptionRepository);
    }
}