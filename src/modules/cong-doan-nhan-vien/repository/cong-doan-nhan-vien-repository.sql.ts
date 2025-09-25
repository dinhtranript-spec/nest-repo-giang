import { InjectModel } from "@nestjs/sequelize";
import { CongDoanNhanVienModel } from "../models/cong-doan-nhan-vien.models";
import { CongDoanNhanVien } from "../entities/cong-doan-nhan-vien.entity";
import { CongDoanNhanVienRepository } from "./cong-doan-nhan-vien-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class CongDoanNhanVienRepositorySql extends SqlRepository<CongDoanNhanVien> implements CongDoanNhanVienRepository {
    constructor(
        @InjectModel(CongDoanNhanVienModel)
        private readonly congDoanNhanVienModel: typeof CongDoanNhanVienModel,
    ) {
        super(congDoanNhanVienModel);
    }
}
