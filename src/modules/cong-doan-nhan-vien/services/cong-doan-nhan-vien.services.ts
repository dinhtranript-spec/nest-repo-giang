import { BaseService } from "@config/service/base.service";
import { CongDoanNhanVien } from "../entities/cong-doan-nhan-vien.entity";
import { CongDoanNhanVienRepository } from "../repository/cong-doan-nhan-vien-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class CongDoanNhanVienService extends BaseService<
    CongDoanNhanVien,
    CongDoanNhanVienRepository
> {
    constructor(
        @InjectRepository(Entity.CONG_DOAN_NHAN_VIEN)
        private readonly congDoanNhanVienRepository: CongDoanNhanVienRepository
    ) {
        super(congDoanNhanVienRepository);
    }
}
