import { BaseService } from "@config/service/base.service";
import { Luong } from "../entities/luong.entity";
import { LuongRepository } from "../repository/luong-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class LuongService extends BaseService<
    Luong,
    LuongRepository
> {
    constructor(
        @InjectRepository(Entity.LUONG)
        private readonly luongRepository: LuongRepository
    ) {
        super(luongRepository);
    }
}
