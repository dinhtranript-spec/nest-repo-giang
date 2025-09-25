import { BaseService } from "@config/service/base.service";
import { PhongBanNhanVien } from "../entities/phong-ban-nhan-vien.entity";
import { PhongBanNhanVienRepository } from "../repository/phong-ban-nhan-vien-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class PhongBanNhanVienService extends BaseService<
    PhongBanNhanVien,
    PhongBanNhanVienRepository
> {
    constructor(
        @InjectRepository(Entity.PHONG_BAN_NHAN_VIEN)
        private readonly phongBanNhanVienRepository: PhongBanNhanVienRepository
    ) {
        super(phongBanNhanVienRepository);
    }
}
