import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { CongViecNhanVienService } from "../services/cong-viec-nhan-vien.services";
import { CongViecNhanVien } from "../entities/cong-viec-nhan-vien.entity";
import { CreateCongViecNhanVienDto } from "../dto/create-cong-viec-nhan-vien.dto";
import { UpdateCongViecNhanVienDto } from "../dto/update-cong-viec-nhan-vien.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionCongViecNhanVienDto } from "../dto/condition-cong-viec-nhan-vien.dto";

@Controller("cong-viec-nhan-vien")
@ApiTags("Cong Viec Nhan Vien")
export class CongViecNhanVienController extends BaseControllerFactory<CongViecNhanVien>(
    CongViecNhanVien,
    ConditionCongViecNhanVienDto,
    CreateCongViecNhanVienDto,
    UpdateCongViecNhanVienDto
) {
    constructor(private readonly congViecNhanVienService: CongViecNhanVienService) {
        super(congViecNhanVienService);
    }
}
