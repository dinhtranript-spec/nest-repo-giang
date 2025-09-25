import { PartialType } from "@nestjs/mapped-types";
import { ViTri } from "../entities/vi-tri.entity";

export class ConditionViTriDto extends PartialType(ViTri) {}
