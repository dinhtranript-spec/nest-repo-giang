import { PartialType } from "@nestjs/mapped-types";
import { DuAn } from "../entities/du-an.entity";

export class ConditionDuAnDto extends PartialType(DuAn) {}
