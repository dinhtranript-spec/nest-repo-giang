import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { PhongBanNhanVienService } from "../services/phong-ban-nhan-vien.services";
import { PhongBanNhanVien } from "../entities/phong-ban-nhan-vien.entity";
import { CreatePhongBanNhanVienDto } from "../dto/create-phong-ban-nhan-vien.dto";
import { UpdatePhongBanNhanVienDto } from "../dto/update-phong-ban-nhan-vien.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionPhongBanNhanVienDto } from "../dto/condition-phong-ban-nhan-vien.dto";

@Controller("phong-ban-nhan-vien")
@ApiTags("Phong Ban Nhan Vien")
export class PhongBanNhanVienController extends BaseControllerFactory<PhongBanNhanVien>(
    PhongBanNhanVien,
    ConditionPhongBanNhanVienDto,
    CreatePhongBanNhanVienDto,
    UpdatePhongBanNhanVienDto
) {
    constructor(private readonly phongBanNhanVienService: PhongBanNhanVienService) {
        super(phongBanNhanVienService);
    }
}
