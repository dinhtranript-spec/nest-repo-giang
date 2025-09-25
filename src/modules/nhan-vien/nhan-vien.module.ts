import { NhanVienController } from "./controller/nhan-vien.controller";
import { NhanVienService } from "./services/nhan-vien.services";
import { NhanVienModel } from "./models/nhan-vien.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { NhanVienRepositorySql } from "./repository/nhan-vien-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([NhanVienModel])
  ],
  controllers: [NhanVienController],
  providers: [
    NhanVienService,
    RepositoryProvider(Entity.NHAN_VIEN, NhanVienRepositorySql)
  ],
  exports: [NhanVienService]
})
export class NhanVienModule {}
