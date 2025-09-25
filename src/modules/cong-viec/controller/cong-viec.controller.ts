import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { CongViecService } from "../services/cong-viec.services";
import { CongViec } from "../entities/cong-viec.entity";
import { CreateCongViecDto } from "../dto/create-cong-viec.dto";
import { UpdateCongViecDto } from "../dto/update-cong-viec.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionCongViecDto } from "../dto/condition-cong-viec.dto";

@Controller("cong-viec")
@ApiTags("Cong Viec")
export class CongViecController extends BaseControllerFactory<CongViec>(
    CongViec,
    ConditionCongViecDto,
    CreateCongViecDto,
    UpdateCongViecDto
) {
    constructor(private readonly congViecService: CongViecService) {
        super(congViecService);
    }
}
