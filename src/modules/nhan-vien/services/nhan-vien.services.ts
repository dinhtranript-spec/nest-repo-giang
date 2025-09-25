import { BaseService } from "@config/service/base.service";
import { NhanVien } from "../entities/nhan-vien.entity";
import { NhanVienRepository } from "../repository/nhan-vien-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class NhanVienService extends BaseService<
    NhanVien,
    NhanVienRepository
> {
    constructor(
        @InjectRepository(Entity.NHAN_VIEN)
        private readonly nhanVienRepository: NhanVienRepository
    ) {
        super(nhanVienRepository);
    }
}
