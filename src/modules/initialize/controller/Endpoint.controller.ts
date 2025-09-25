import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { EndpointInitializeService } from "../services/endpoint-initialize.service";
import { EndpointInitializeEntity } from "../entities/endpoint-initialize.entity";
import { CreateEndpointInitializeDto } from "../dto/enpoint-initialize-dto/create-endpoint.dto";
import { UpdateEndpointInitializeDto } from "../dto/enpoint-initialize-dto/update-enpoint.dto";
import { ConditionEndpointDto } from "../dto/enpoint-initialize-dto/condition-endpoint.dto";
import { Controller, Put, Post, Get, Delete, Param, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("endpoint")
@ApiTags("Endpoint")
export class EndpointController extends BaseControllerFactory<EndpointInitializeEntity>(
    EndpointInitializeEntity,
    CreateEndpointInitializeDto,
    UpdateEndpointInitializeDto,
    ConditionEndpointDto,
){
    constructor(
        private readonly endpointInitializeService: EndpointInitializeService
    ) {
        super(endpointInitializeService);
    }
}