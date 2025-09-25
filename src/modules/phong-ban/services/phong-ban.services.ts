import { BaseService } from "@config/service/base.service";
import { PhongBan } from "../entities/phong-ban.entity";
import { PhongBanRepository } from "../repository/phong-ban-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class PhongBanService extends BaseService<
    PhongBan,
    PhongBanRepository
> {
    constructor(
        @InjectRepository(Entity.PHONG_BAN)
        private readonly phongBanRepository: PhongBanRepository
    ) {
        super(phongBanRepository);
    }
}
