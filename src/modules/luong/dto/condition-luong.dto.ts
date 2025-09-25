import { PartialType } from "@nestjs/mapped-types";
import { Luong } from "../entities/luong.entity";

export class ConditionLuongDto extends PartialType(Luong) {}
