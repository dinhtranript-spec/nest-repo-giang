import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { CongDoanService } from "../services/cong-doan.services";
import { CongDoan } from "../entities/cong-doan.entity";
import { CreateCongDoanDto } from "../dto/create-cong-doan.dto";
import { UpdateCongDoanDto } from "../dto/update-cong-doan.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionCongDoanDto } from "../dto/condition-cong-doan.dto";

@Controller("cong-doan")
@ApiTags("Cong Doan")
export class CongDoanController extends BaseControllerFactory<CongDoan>(
    CongDoan,
    ConditionCongDoanDto,
    CreateCongDoanDto,
    UpdateCongDoanDto
) {
    constructor(private readonly congDoanService: CongDoanService) {
        super(congDoanService);
    }
}
