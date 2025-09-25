import { CongViecController } from "./controller/cong-viec.controller";
import { CongViecService } from "./services/cong-viec.services";
import { CongViecModel } from "./models/cong-viec.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { CongViecRepositorySql } from "./repository/cong-viec-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([CongViecModel])
  ],
  controllers: [CongViecController],
  providers: [
    CongViecService,
    RepositoryProvider(Entity.CONG_VIEC, CongViecRepositorySql)
  ],
  exports: [CongViecService]
})
export class CongViecModule {}
