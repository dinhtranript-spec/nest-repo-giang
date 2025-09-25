import { ViTriController } from "./controller/vi-tri.controller";
import { ViTriService } from "./services/vi-tri.services";
import { ViTriModel } from "./models/vi-tri.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { ViTriRepositorySql } from "./repository/vi-tri-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([ViTriModel])
  ],
  controllers: [ViTriController],
  providers: [
    ViTriService,
    RepositoryProvider(Entity.VI_TRI, ViTriRepositorySql)
  ],
  exports: [ViTriService]
})
export class ViTriModule {}
