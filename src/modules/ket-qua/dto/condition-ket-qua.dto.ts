import { PartialType } from "@nestjs/mapped-types";
import { KetQua } from "../entities/ket-qua.entity";

export class ConditionKetQuaDto extends PartialType(KetQua) {}
