import { InjectModel } from "@nestjs/sequelize";
import { LoaiDuAnModel } from "../models/loai-du-an.models";
import { LoaiDuAn } from "../entities/loai-du-an.entity";
import { LoaiDuAnRepository } from "./loai-du-an-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class LoaiDuAnRepositorySql extends SqlRepository<LoaiDuAn> implements LoaiDuAnRepository {
    constructor(
        @InjectModel(LoaiDuAnModel)
        private readonly loaiDuAnModel: typeof LoaiDuAnModel,
    ) {
        super(loaiDuAnModel);
    }
}
