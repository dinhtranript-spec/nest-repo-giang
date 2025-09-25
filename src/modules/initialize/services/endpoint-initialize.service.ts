import { Injectable } from "@nestjs/common";
import { BaseService } from "@config/service/base.service";
import { EndpointInitializeEntity } from "../entities/endpoint-initialize.entity";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";
import { EndpointInitializeRepository } from "../repository/endpoint-initialize-repository.interface";

@Injectable()
export class EndpointInitializeService extends BaseService<
    EndpointInitializeEntity,
    EndpointInitializeRepository
> {
    constructor(
        @InjectRepository(Entity.ENDPOINT_INITIALIZE)
        private readonly endpointInitializeRepository: EndpointInitializeRepository
    ) {
        super(endpointInitializeRepository);
    }
}