import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { LoaiDuAnService } from "../services/loai-du-an.services";
import { LoaiDuAn } from "../entities/loai-du-an.entity";
import { CreateLoaiDuAnDto } from "../dto/create-loai-du-an.dto";
import { UpdateLoaiDuAnDto } from "../dto/update-loai-du-an.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionLoaiDuAnDto } from "../dto/condition-loai-du-an.dto";

@Controller("loai-du-an")
@ApiTags("Loai Du An")
export class LoaiDuAnController extends BaseControllerFactory<LoaiDuAn>(
    LoaiDuAn,
    ConditionLoaiDuAnDto,
    CreateLoaiDuAnDto,
    UpdateLoaiDuAnDto
) {
    constructor(private readonly loaiDuAnService: LoaiDuAnService) {
        super(loaiDuAnService);
    }
}
