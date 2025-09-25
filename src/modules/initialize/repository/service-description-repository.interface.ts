import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { ServiceDescriptionInitialize } from "../entities/service-description.entity";

export interface ServiceDescriptionRepository extends BaseRepository<ServiceDescriptionInitialize> {
    
}