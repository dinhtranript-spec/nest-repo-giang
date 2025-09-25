import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { ViTriService } from "../services/vi-tri.services";
import { ViTri } from "../entities/vi-tri.entity";
import { CreateViTriDto } from "../dto/create-vi-tri.dto";
import { UpdateViTriDto } from "../dto/update-vi-tri.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionViTriDto } from "../dto/condition-vi-tri.dto";

@Controller("vi-tri")
@ApiTags("Vi Tri")
export class ViTriController extends BaseControllerFactory<ViTri>(
    ViTri,
    ConditionViTriDto,
    CreateViTriDto,
    UpdateViTriDto
) {
    constructor(private readonly viTriService: ViTriService) {
        super(viTriService);
    }
}
