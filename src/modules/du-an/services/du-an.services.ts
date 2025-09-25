import { BaseService } from "@config/service/base.service";
import { DuAn } from "../entities/du-an.entity";
import { DuAnRepository } from "../repository/du-an-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class DuAnService extends BaseService<
    DuAn,
    DuAnRepository
> {
    constructor(
        @InjectRepository(Entity.DU_AN)
        private readonly duAnRepository: DuAnRepository
    ) {
        super(duAnRepository);
    }
}
