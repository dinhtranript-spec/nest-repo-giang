import { PartialType } from "@nestjs/mapped-types";
import { CongViecNhanVien } from "../entities/cong-viec-nhan-vien.entity";

export class ConditionCongViecNhanVienDto extends PartialType(CongViecNhanVien) {}
