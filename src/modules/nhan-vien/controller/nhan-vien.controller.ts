import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { NhanVienService } from "../services/nhan-vien.services";
import { NhanVien } from "../entities/nhan-vien.entity";
import { CreateNhanVienDto } from "../dto/create-nhan-vien.dto";
import { UpdateNhanVienDto } from "../dto/update-nhan-vien.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionNhanVienDto } from "../dto/condition-nhan-vien.dto";

@Controller("nhan-vien")
@ApiTags("Nhan Vien")
export class NhanVienController extends BaseControllerFactory<NhanVien>(
    NhanVien,
    ConditionNhanVienDto,
    CreateNhanVienDto,
    UpdateNhanVienDto
) {
    constructor(private readonly nhanVienService: NhanVienService) {
        super(nhanVienService);
    }
}
