import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { LuongService } from "../services/luong.services";
import { Luong } from "../entities/luong.entity";
import { CreateLuongDto } from "../dto/create-luong.dto";
import { UpdateLuongDto } from "../dto/update-luong.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionLuongDto } from "../dto/condition-luong.dto";

@Controller("luong")
@ApiTags("Luong")
export class LuongController extends BaseControllerFactory<Luong>(
    Luong,
    ConditionLuongDto,
    CreateLuongDto,
    UpdateLuongDto
) {
    constructor(private readonly luongService: LuongService) {
        super(luongService);
    }
}
