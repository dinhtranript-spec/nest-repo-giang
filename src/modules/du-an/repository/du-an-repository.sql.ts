import { InjectModel } from "@nestjs/sequelize";
import { DuAnModel } from "../models/du-an.models";
import { DuAn } from "../entities/du-an.entity";
import { DuAnRepository } from "./du-an-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class DuAnRepositorySql extends SqlRepository<DuAn> implements DuAnRepository {
    constructor(
        @InjectModel(DuAnModel)
        private readonly duAnModel: typeof DuAnModel,
    ) {
        super(duAnModel);
    }
}
