import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ServiceDescriptionService } from "../services/service-description.service";
import { ServiceDescriptionInitialize } from "../entities/service-description.entity";
import { CreateServiceDescriptionInitializeDto } from "../dto/service-descripion-dto/create-service-description.dto";
import { UpdateServiceDescriptionInitializeDto } from "../dto/service-descripion-dto/update-service-description.dto";
import { ConditionServiceDescriptionDto } from "../dto/service-descripion-dto/condition-service-description.dto";
import { Controller, Put, Post, Get, Delete, Param, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("service-description")
@ApiTags("Service Description")
export class ServiceDescriptionController extends BaseControllerFactory<ServiceDescriptionInitialize>(
    ServiceDescriptionInitialize,
    CreateServiceDescriptionInitializeDto,
    UpdateServiceDescriptionInitializeDto,
    ConditionServiceDescriptionDto,
){
    constructor(
        private readonly serviceDescriptionService: ServiceDescriptionService
    ) {
        super(serviceDescriptionService);
    }
}