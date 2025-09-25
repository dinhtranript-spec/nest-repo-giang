import { IsOptional, IsString, IsArray, IsNumber } from "class-validator";
import { Transform, Type } from "class-transformer";
import { CommonQueryDto } from "@common/dto/common-query.dto";
import { Message } from "../entities/message.entity";

export class QueryMessageDto implements CommonQueryDto<Message> {
    @IsOptional()
    select?: { [K in keyof Message | (string & {})]?: 0 | 1 };

    @IsOptional()
    sort?: { [K in keyof Message | (string & {})]?: -1 | 1 };

    @IsOptional()
    filters?: any[];

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    skip?: number;

    @IsOptional()
    population?: any[];

    @IsOptional()
    enableDataPartition?: boolean;

    // Custom fields cho Message
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    fromId?: string;

    @IsOptional()
    @IsString()
    toId?: string;

    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',').map(id => id.trim());
        }
        return value;
    })
    @IsArray()
    fromIds?: string[];

    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',').map(id => id.trim());
        }
        return value;
    })
    @IsArray()
    toIds?: string[];

    @IsOptional()
    @IsString()
    dateFrom?: string;

    @IsOptional()
    @IsString()
    dateTo?: string;
} 