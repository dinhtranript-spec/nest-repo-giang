import { PartialType } from "@nestjs/mapped-types";
import { CongViec } from "../entities/cong-viec.entity";

export class ConditionCongViecDto extends PartialType(CongViec) {}
