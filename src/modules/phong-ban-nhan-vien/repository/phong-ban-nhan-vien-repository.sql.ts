import { InjectModel } from "@nestjs/sequelize";
import { PhongBanNhanVienModel } from "../models/phong-ban-nhan-vien.models";
import { PhongBanNhanVien } from "../entities/phong-ban-nhan-vien.entity";
import { PhongBanNhanVienRepository } from "./phong-ban-nhan-vien-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class PhongBanNhanVienRepositorySql extends SqlRepository<PhongBanNhanVien> implements PhongBanNhanVienRepository {
    constructor(
        @InjectModel(PhongBanNhanVienModel)
        private readonly phongBanNhanVienModel: typeof PhongBanNhanVienModel,
    ) {
        super(phongBanNhanVienModel);
    }
}
