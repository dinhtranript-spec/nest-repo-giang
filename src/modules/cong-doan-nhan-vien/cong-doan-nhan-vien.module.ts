import { CongDoanNhanVienController } from "./controller/cong-doan-nhan-vien.controller";
import { CongDoanNhanVienService } from "./services/cong-doan-nhan-vien.services";
import { CongDoanNhanVienModel } from "./models/cong-doan-nhan-vien.models";
import { CongDoanModel } from "../cong-doan/models/cong-doan.models";
import { NhanVienModel } from "../nhan-vien/models/nhan-vien.models";
import { KetQuaModel } from "../ket-qua/models/ket-qua.models";
import { DuAnModel } from "../du-an/models/du-an.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { CongDoanNhanVienRepositorySql } from "./repository/cong-doan-nhan-vien-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([CongDoanNhanVienModel, CongDoanModel, NhanVienModel, KetQuaModel, DuAnModel])
  ],
  controllers: [CongDoanNhanVienController],
  providers: [
    CongDoanNhanVienService,
    RepositoryProvider(Entity.CONG_DOAN_NHAN_VIEN, CongDoanNhanVienRepositorySql)
  ],
  exports: [CongDoanNhanVienService]
})
export class CongDoanNhanVienModule {}
