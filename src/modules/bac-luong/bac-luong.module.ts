import { BacLuongController } from "./controller/bac-luong.controller";
import { BacLuongService } from "./services/bac-luong.services";
import { BacLuongModel } from "./models/bac-luong.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { BacLuongRepositorySql } from "./repository/bac-luong-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([BacLuongModel])
  ],
  controllers: [BacLuongController],
  providers: [
    BacLuongService,
    RepositoryProvider(Entity.BAC_LUONG, BacLuongRepositorySql)
  ],
  exports: [BacLuongService]
})
export class BacLuongModule {}
