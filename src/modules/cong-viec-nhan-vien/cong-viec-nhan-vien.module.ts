import { CongViecNhanVienController } from "./controller/cong-viec-nhan-vien.controller";
import { CongViecNhanVienService } from "./services/cong-viec-nhan-vien.services";
import { CongViecNhanVienModel } from "./models/cong-viec-nhan-vien.models";
import { NhanVienModel } from "../nhan-vien/models/nhan-vien.models";
import { CongViecModel } from "../cong-viec/models/cong-viec.models";
import { KetQuaModel } from "../ket-qua/models/ket-qua.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { CongViecNhanVienRepositorySql } from "./repository/cong-viec-nhan-vien-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([CongViecNhanVienModel, NhanVienModel, CongViecModel, KetQuaModel])
  ],
  controllers: [CongViecNhanVienController],
  providers: [
    CongViecNhanVienService,
    RepositoryProvider(Entity.CONG_VIEC_NHAN_VIEN, CongViecNhanVienRepositorySql)
  ],
  exports: [CongViecNhanVienService]
})
export class CongViecNhanVienModule {}
