import { BaseService } from "@config/service/base.service";
import { KetQua } from "../entities/ket-qua.entity";
import { KetQuaRepository } from "../repository/ket-qua-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class KetQuaService extends BaseService<
    KetQua,
    KetQuaRepository
> {
    constructor(
        @InjectRepository(Entity.KET_QUA)
        private readonly ketQuaRepository: KetQuaRepository
    ) {
        super(ketQuaRepository);
    }
}
