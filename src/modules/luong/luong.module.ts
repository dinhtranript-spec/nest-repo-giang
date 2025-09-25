import { LuongController } from "./controller/luong.controller";
import { LuongService } from "./services/luong.services";
import { LuongModel } from "./models/luong.models";
import { NhanVienModel } from "../nhan-vien/models/nhan-vien.models";
import { BacLuongModel } from "../bac-luong/models/bac-luong.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { LuongRepositorySql } from "./repository/luong-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([LuongModel, NhanVienModel, BacLuongModel])
  ],
  controllers: [LuongController],
  providers: [
    LuongService,
    RepositoryProvider(Entity.LUONG, LuongRepositorySql)
  ],
  exports: [LuongService]
})
export class LuongModule {}
