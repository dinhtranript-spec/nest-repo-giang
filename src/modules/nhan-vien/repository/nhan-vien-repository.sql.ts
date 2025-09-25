import { InjectModel } from "@nestjs/sequelize";
import { NhanVienModel } from "../models/nhan-vien.models";
import { NhanVien } from "../entities/nhan-vien.entity";
import { NhanVienRepository } from "./nhan-vien-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class NhanVienRepositorySql extends SqlRepository<NhanVien> implements NhanVienRepository {
    constructor(
        @InjectModel(NhanVienModel)
        private readonly nhanVienModel: typeof NhanVienModel,
    ) {
        super(nhanVienModel);
    }
}
