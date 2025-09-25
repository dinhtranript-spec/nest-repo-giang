import { LoaiDuAnController } from "./controller/loai-du-an.controller";
import { LoaiDuAnService } from "./services/loai-du-an.services";
import { LoaiDuAnModel } from "./models/loai-du-an.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { LoaiDuAnRepositorySql } from "./repository/loai-du-an-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([LoaiDuAnModel])
  ],
  controllers: [LoaiDuAnController],
  providers: [
    LoaiDuAnService,
    RepositoryProvider(Entity.LOAI_DU_AN, LoaiDuAnRepositorySql)
  ],
  exports: [LoaiDuAnService]
})
export class LoaiDuAnModule {}
