import { InjectModel } from "@nestjs/sequelize";
import { CongViecModel } from "../models/cong-viec.models";
import { CongViec } from "../entities/cong-viec.entity";
import { CongViecRepository } from "./cong-viec-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class CongViecRepositorySql extends SqlRepository<CongViec> implements CongViecRepository {
    constructor(
        @InjectModel(CongViecModel)
        private readonly congViecModel: typeof CongViecModel,
    ) {
        super(congViecModel);
    }
}
