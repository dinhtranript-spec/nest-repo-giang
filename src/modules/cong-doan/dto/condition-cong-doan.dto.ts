import { PartialType } from "@nestjs/mapped-types";
import { CongDoan } from "../entities/cong-doan.entity";

export class ConditionCongDoanDto extends PartialType(CongDoan) {}
