import { DuAnController } from "./controller/du-an.controller";
import { DuAnService } from "./services/du-an.services";
import { DuAnModel } from "./models/du-an.models";
import { NhanVienModel } from "../nhan-vien/models/nhan-vien.models";
import { LoaiDuAnModel } from "../loai-du-an/models/loai-du-an.models";
import { PhongBanModel } from "../phong-ban/models/phong-ban.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { DuAnRepositorySql } from "./repository/du-an-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([DuAnModel, NhanVienModel, LoaiDuAnModel, PhongBanModel])
  ],
  controllers: [DuAnController],
  providers: [
    DuAnService,
    RepositoryProvider(Entity.DU_AN, DuAnRepositorySql)
  ],
  exports: [DuAnService]
})
export class DuAnModule {}
