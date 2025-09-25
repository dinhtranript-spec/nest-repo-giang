import { BaseService } from "@config/service/base.service";
import { CongViec } from "../entities/cong-viec.entity";
import { CongViecRepository } from "../repository/cong-viec-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class CongViecService extends BaseService<
    CongViec,
    CongViecRepository
> {
    constructor(
        @InjectRepository(Entity.CONG_VIEC)
        private readonly congViecRepository: CongViecRepository
    ) {
        super(congViecRepository);
    }
}
