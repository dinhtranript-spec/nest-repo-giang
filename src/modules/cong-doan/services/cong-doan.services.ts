import { BaseService } from "@config/service/base.service";
import { CongDoan } from "../entities/cong-doan.entity";
import { CongDoanRepository } from "../repository/cong-doan-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class CongDoanService extends BaseService<
    CongDoan,
    CongDoanRepository
> {
    constructor(
        @InjectRepository(Entity.CONG_DOAN)
        private readonly congDoanRepository: CongDoanRepository
    ) {
        super(congDoanRepository);
    }
}
