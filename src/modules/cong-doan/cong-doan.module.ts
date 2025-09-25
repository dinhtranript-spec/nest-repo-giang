import { CongDoanController } from "./controller/cong-doan.controller";
import { CongDoanService } from "./services/cong-doan.services";
import { CongDoanModel } from "./models/cong-doan.models";
import { DuAnModel } from "../du-an/models/du-an.models";
import { NhanVienModel } from "../nhan-vien/models/nhan-vien.models";
import { KetQuaModel } from "../ket-qua/models/ket-qua.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { CongDoanRepositorySql } from "./repository/cong-doan-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([CongDoanModel, DuAnModel, NhanVienModel, KetQuaModel])
  ],
  controllers: [CongDoanController],
  providers: [
    CongDoanService,
    RepositoryProvider(Entity.CONG_DOAN, CongDoanRepositorySql)
  ],
  exports: [CongDoanService]
})
export class CongDoanModule {}
