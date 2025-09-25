import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ServiceInitializeService } from "../services/service-initialize.service";
import { ServiceInitializeEntity } from "../entities/service-initialize.entity";
import { CreateServiceInitializeDto } from "../dto/service-initialize-dto/create-service-initialize.dto";
import { UpdateServiceInitializeDto } from "../dto/service-initialize-dto/update-service-initialize.dto";
import { ConditionServiceInitializeDto } from "../dto/service-initialize-dto/condition-service-initialize.dto";
import { Controller, Put, Post, Get, Delete, Param, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("service")
@ApiTags("Service")
export class ServiceController extends BaseControllerFactory<ServiceInitializeEntity>(
    ServiceInitializeEntity,
    CreateServiceInitializeDto,
    UpdateServiceInitializeDto,
    ConditionServiceInitializeDto,
){
    constructor(
        private readonly serviceInitializeService: ServiceInitializeService
    ) {
        super(serviceInitializeService);
    }

}