import { InjectModel } from "@nestjs/sequelize";
import { BacLuongModel } from "../models/bac-luong.models";
import { BacLuong } from "../entities/bac-luong.entity";
import { BacLuongRepository } from "./bac-luong-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class BacLuongRepositorySql extends SqlRepository<BacLuong> implements BacLuongRepository {
    constructor(
        @InjectModel(BacLuongModel)
        private readonly bacLuongModel: typeof BacLuongModel,
    ) {
        super(bacLuongModel);
    }
}
