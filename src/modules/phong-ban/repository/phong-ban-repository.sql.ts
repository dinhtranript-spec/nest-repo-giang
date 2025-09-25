import { InjectModel } from "@nestjs/sequelize";
import { PhongBanModel } from "../models/phong-ban.models";
import { PhongBan } from "../entities/phong-ban.entity";
import { PhongBanRepository } from "./phong-ban-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class PhongBanRepositorySql extends SqlRepository<PhongBan> implements PhongBanRepository {
    constructor(
        @InjectModel(PhongBanModel)
        private readonly phongBanModel: typeof PhongBanModel,
    ) {
        super(phongBanModel);
    }
}
