import { InjectModel } from "@nestjs/sequelize";
import { LuongModel } from "../models/luong.models";
import { Luong } from "../entities/luong.entity";
import { LuongRepository } from "./luong-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class LuongRepositorySql extends SqlRepository<Luong> implements LuongRepository {
    constructor(
        @InjectModel(LuongModel)
        private readonly luongModel: typeof LuongModel,
    ) {
        super(luongModel);
    }
}
