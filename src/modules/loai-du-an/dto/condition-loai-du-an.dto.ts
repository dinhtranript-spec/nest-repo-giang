import { PartialType } from "@nestjs/mapped-types";
import { LoaiDuAn } from "../entities/loai-du-an.entity";

export class ConditionLoaiDuAnDto extends PartialType(LoaiDuAn) {}
