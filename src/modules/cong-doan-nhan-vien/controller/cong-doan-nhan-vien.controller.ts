import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { CongDoanNhanVienService } from "../services/cong-doan-nhan-vien.services";
import { CongDoanNhanVien } from "../entities/cong-doan-nhan-vien.entity";
import { CreateCongDoanNhanVienDto } from "../dto/create-cong-doan-nhan-vien.dto";
import { UpdateCongDoanNhanVienDto } from "../dto/update-cong-doan-nhan-vien.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionCongDoanNhanVienDto } from "../dto/condition-cong-doan-nhan-vien.dto";

@Controller("cong-doan-nhan-vien")
@ApiTags("Cong Doan Nhan Vien")
export class CongDoanNhanVienController extends BaseControllerFactory<CongDoanNhanVien>(
    CongDoanNhanVien,
    ConditionCongDoanNhanVienDto,
    CreateCongDoanNhanVienDto,
    UpdateCongDoanNhanVienDto
) {
    constructor(private readonly congDoanNhanVienService: CongDoanNhanVienService) {
        super(congDoanNhanVienService);
    }
}
