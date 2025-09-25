import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { PhongBanService } from "../services/phong-ban.services";
import { PhongBan } from "../entities/phong-ban.entity";
import { CreatePhongBanDto } from "../dto/create-phong-ban.dto";
import { UpdatePhongBanDto } from "../dto/update-phong-ban.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionPhongBanDto } from "../dto/condition-phong-ban.dto";

@Controller("phong-ban")
@ApiTags("Phong Ban")
export class PhongBanController extends BaseControllerFactory<PhongBan>(
    PhongBan,
    ConditionPhongBanDto,
    CreatePhongBanDto,
    UpdatePhongBanDto
) {
    constructor(private readonly phongBanService: PhongBanService) {
        super(phongBanService);
    }
}
