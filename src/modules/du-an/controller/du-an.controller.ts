import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { DuAnService } from "../services/du-an.services";
import { DuAn } from "../entities/du-an.entity";
import { CreateDuAnDto } from "../dto/create-du-an.dto";
import { UpdateDuAnDto } from "../dto/update-du-an.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionDuAnDto } from "../dto/condition-du-an.dto";

@Controller("du-an")
@ApiTags("Du An")
export class DuAnController extends BaseControllerFactory<DuAn>(
    DuAn,
    ConditionDuAnDto,
    CreateDuAnDto,
    UpdateDuAnDto
) {
    constructor(private readonly duAnService: DuAnService) {
        super(duAnService);
    }
}
