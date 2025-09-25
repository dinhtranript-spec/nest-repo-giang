import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { KetQuaService } from "../services/ket-qua.services";
import { KetQua } from "../entities/ket-qua.entity";
import { CreateKetQuaDto } from "../dto/create-ket-qua.dto";
import { UpdateKetQuaDto } from "../dto/update-ket-qua.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionKetQuaDto } from "../dto/condition-ket-qua.dto";

@Controller("ket-qua")
@ApiTags("Ket Qua")
export class KetQuaController extends BaseControllerFactory<KetQua>(
    KetQua,
    ConditionKetQuaDto,
    CreateKetQuaDto,
    UpdateKetQuaDto
) {
    constructor(private readonly ketQuaService: KetQuaService) {
        super(ketQuaService);
    }
}
