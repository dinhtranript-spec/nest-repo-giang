import { InjectModel } from "@nestjs/sequelize";
import { CongDoanModel } from "../models/cong-doan.models";
import { CongDoan } from "../entities/cong-doan.entity";
import { CongDoanRepository } from "./cong-doan-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class CongDoanRepositorySql extends SqlRepository<CongDoan> implements CongDoanRepository {
    constructor(
        @InjectModel(CongDoanModel)
        private readonly congDoanModel: typeof CongDoanModel,
    ) {
        super(congDoanModel);
    }
}
