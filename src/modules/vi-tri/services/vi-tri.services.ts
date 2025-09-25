import { BaseService } from "@config/service/base.service";
import { ViTri } from "../entities/vi-tri.entity";
import { ViTriRepository } from "../repository/vi-tri-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class ViTriService extends BaseService<
    ViTri,
    ViTriRepository
> {
    constructor(
        @InjectRepository(Entity.VI_TRI)
        private readonly viTriRepository: ViTriRepository
    ) {
        super(viTriRepository);
    }
}
