import { InjectModel } from "@nestjs/sequelize";
import { CongViecNhanVienModel } from "../models/cong-viec-nhan-vien.models";
import { CongViecNhanVien } from "../entities/cong-viec-nhan-vien.entity";
import { CongViecNhanVienRepository } from "./cong-viec-nhan-vien-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";

export class CongViecNhanVienRepositorySql extends SqlRepository<CongViecNhanVien> implements CongViecNhanVienRepository {
    constructor(
        @InjectModel(CongViecNhanVienModel)
        private readonly congViecNhanVienModel: typeof CongViecNhanVienModel,
    ) {
        super(congViecNhanVienModel);
    }
}
