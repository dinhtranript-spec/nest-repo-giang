import { PartialType } from "@nestjs/mapped-types";
import { BacLuong } from "../entities/bac-luong.entity";

export class ConditionBacLuongDto extends PartialType(BacLuong) {}
