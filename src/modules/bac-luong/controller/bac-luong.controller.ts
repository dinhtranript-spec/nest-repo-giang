import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { BacLuongService } from "../services/bac-luong.services";
import { BacLuong } from "../entities/bac-luong.entity";
import { CreateBacLuongDto } from "../dto/create-bac-luong.dto";
import { UpdateBacLuongDto } from "../dto/update-bac-luong.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionBacLuongDto } from "../dto/condition-bac-luong.dto";

@Controller("bac-luong")
@ApiTags("Bac Luong")
export class BacLuongController extends BaseControllerFactory<BacLuong>(
    BacLuong,
    ConditionBacLuongDto,
    CreateBacLuongDto,
    UpdateBacLuongDto
) {
    constructor(private readonly bacLuongService: BacLuongService) {
        super(bacLuongService);
    }
}
