import { PhongBanNhanVienController } from "./controller/phong-ban-nhan-vien.controller";
import { PhongBanNhanVienService } from "./services/phong-ban-nhan-vien.services";
import { PhongBanNhanVienModel } from "./models/phong-ban-nhan-vien.models";
import { PhongBanModel } from "../phong-ban/models/phong-ban.models";
import { NhanVienModel } from "../nhan-vien/models/nhan-vien.models";
import { ViTriModel } from "../vi-tri/models/vi-tri.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { PhongBanNhanVienRepositorySql } from "./repository/phong-ban-nhan-vien-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([PhongBanNhanVienModel, PhongBanModel, NhanVienModel, ViTriModel])
  ],
  controllers: [PhongBanNhanVienController],
  providers: [
    PhongBanNhanVienService,
    RepositoryProvider(Entity.PHONG_BAN_NHAN_VIEN, PhongBanNhanVienRepositorySql)
  ],
  exports: [PhongBanNhanVienService]
})
export class PhongBanNhanVienModule {}
