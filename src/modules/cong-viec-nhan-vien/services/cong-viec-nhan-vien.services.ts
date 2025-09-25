import { BaseService } from "@config/service/base.service";
import { CongViecNhanVien } from "../entities/cong-viec-nhan-vien.entity";
import { CongViecNhanVienRepository } from "../repository/cong-viec-nhan-vien-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class CongViecNhanVienService extends BaseService<
    CongViecNhanVien,
    CongViecNhanVienRepository
> {
    constructor(
        @InjectRepository(Entity.CONG_VIEC_NHAN_VIEN)
        private readonly congViecNhanVienRepository: CongViecNhanVienRepository
    ) {
        super(congViecNhanVienRepository);
    }
}
