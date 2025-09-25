import { BaseService } from "@config/service/base.service";
import { LoaiDuAn } from "../entities/loai-du-an.entity";
import { LoaiDuAnRepository } from "../repository/loai-du-an-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class LoaiDuAnService extends BaseService<
    LoaiDuAn,
    LoaiDuAnRepository
> {
    constructor(
        @InjectRepository(Entity.LOAI_DU_AN)
        private readonly loaiDuAnRepository: LoaiDuAnRepository
    ) {
        super(loaiDuAnRepository);
    }
}
