import { PartialType } from "@nestjs/mapped-types";
import { PhongBan } from "../entities/phong-ban.entity";

export class ConditionPhongBanDto extends PartialType(PhongBan) {}
