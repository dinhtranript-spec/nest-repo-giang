import { PartialType } from "@nestjs/mapped-types";
import { PhongBanNhanVien } from "../entities/phong-ban-nhan-vien.entity";

export class ConditionPhongBanNhanVienDto extends PartialType(PhongBanNhanVien) {}
