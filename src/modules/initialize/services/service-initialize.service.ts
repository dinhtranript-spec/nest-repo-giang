import { BaseService } from "@config/service/base.service";
import { ServiceInitializeEntity}  from "../entities/service-initialize.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";
import { ServiceRepository } from "../repository/service-repository.interface";

@Injectable()
export class ServiceInitializeService extends BaseService<
    ServiceInitializeEntity,
    ServiceRepository
> {
    constructor(
        @InjectRepository(Entity.SERVICE_INITIALIZE)
        private readonly serviceInitializeRepository: ServiceRepository
    ) {
        super(serviceInitializeRepository);
    }
}