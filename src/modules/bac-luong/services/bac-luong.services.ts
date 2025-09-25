import { BaseService } from "@config/service/base.service";
import { BacLuong } from "../entities/bac-luong.entity";
import { BacLuongRepository } from "../repository/bac-luong-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

@Injectable()
export class BacLuongService extends BaseService<
    BacLuong,
    BacLuongRepository
> {
    constructor(
        @InjectRepository(Entity.BAC_LUONG)
        private readonly bacLuongRepository: BacLuongRepository
    ) {
        super(bacLuongRepository);
    }
}
