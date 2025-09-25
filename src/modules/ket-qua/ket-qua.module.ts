import { KetQuaController } from "./controller/ket-qua.controller";
import { KetQuaService } from "./services/ket-qua.services";
import { KetQuaModel } from "./models/ket-qua.models";
import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { KetQuaRepositorySql } from "./repository/ket-qua-repository.sql";

@Module({
  imports: [
    SequelizeModule.forFeature([KetQuaModel])
  ],
  controllers: [KetQuaController],
  providers: [
    KetQuaService,
    RepositoryProvider(Entity.KET_QUA, KetQuaRepositorySql)
  ],
  exports: [KetQuaService]
})
export class KetQuaModule {}
