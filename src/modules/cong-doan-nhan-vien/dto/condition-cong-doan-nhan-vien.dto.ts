import { PartialType } from "@nestjs/mapped-types";
import { CongDoanNhanVien } from "../entities/cong-doan-nhan-vien.entity";

export class ConditionCongDoanNhanVienDto extends PartialType(CongDoanNhanVien) {}
