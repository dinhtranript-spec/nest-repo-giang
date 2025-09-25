import { PhongBanController } from "./controller/phong-ban.controller";
import { PhongBanService } from "./services/phong-ban.services";
import { PhongBanModel } from "./models/phong-ban.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { PhongBanRepositorySql } from "./repository/phong-ban-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([PhongBanModel])
  ],
  controllers: [PhongBanController],
  providers: [
    PhongBanService,
    RepositoryProvider(Entity.PHONG_BAN, PhongBanRepositorySql)
  ],
  exports: [PhongBanService]
})
export class PhongBanModule {}
