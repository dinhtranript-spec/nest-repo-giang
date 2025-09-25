import { PartialType } from "@nestjs/mapped-types";
import { NhanVien } from "../entities/nhan-vien.entity";

export class ConditionNhanVienDto extends PartialType(NhanVien) {}
