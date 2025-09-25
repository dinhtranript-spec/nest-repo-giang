import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class MemberNameQueryDto {
    @ApiPropertyOptional({ 
        description: 'Member class', 
        example: 'ORG',
        required: false
    })
    @IsOptional()
    @IsString()
    member_class?: string;

    @ApiPropertyOptional({ 
        description: 'Member code', 
        example: '12345',
        required: false
    })
    @IsOptional()
    @IsString()
    member_code?: string;
}
