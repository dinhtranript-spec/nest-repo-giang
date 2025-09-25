import { InjectModel } from "@nestjs/sequelize";
import { KetQuaModel } from "../models/ket-qua.models";
import { KetQua } from "../entities/ket-qua.entity";
import { KetQuaRepository } from "./ket-qua-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class KetQuaRepositorySql extends SqlRepository<KetQua> implements KetQuaRepository {
    constructor(
        @InjectModel(KetQuaModel)
        private readonly ketQuaModel: typeof KetQuaModel,
    ) {
        super(ketQuaModel);
    }
}
