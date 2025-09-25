import { InjectModel } from "@nestjs/sequelize";
import { ViTriModel } from "../models/vi-tri.models";
import { ViTri } from "../entities/vi-tri.entity";
import { ViTriRepository } from "./vi-tri-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class ViTriRepositorySql extends SqlRepository<ViTri> implements ViTriRepository {
    constructor(
        @InjectModel(ViTriModel)
        private readonly viTriModel: typeof ViTriModel,
    ) {
        super(viTriModel);
    }
}
