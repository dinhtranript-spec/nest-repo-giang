import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateKeyDto {
    @ApiProperty({ description: 'Tên key' })
    @IsString()
    name: string;
}

export class SubjectFieldValuesDto {
    @ApiProperty({ description: 'Country (2 ký tự)', example: 'VN' })
    @IsString()
    C: string;

    @ApiProperty({ description: 'Common Name', example: 'Security Server' })
    @IsString()
    CN: string;

    @ApiProperty({ description: 'Serial Number', example: '12345' })
    @IsString()
    serialNumber: string;

    @ApiProperty({ description: 'Organization', example: 'X-Road Organization' })
    @IsString()
    O: string;
}

export enum KeyUsageType {
    SIGNING = 'SIGNING',
    AUTHENTICATION = 'AUTHENTICATION'
}

export enum CSRFormat {
    PEM = 'PEM',
    DER = 'DER'
}

export class GenerateCSRDto {
    @ApiProperty({ 
        description: 'Loại sử dụng key', 
        enum: KeyUsageType,
        example: KeyUsageType.SIGNING
    })
    @IsEnum(KeyUsageType)
    key_usage_type: KeyUsageType;

    @ApiProperty({ description: 'Tên CA (Certificate Authority)', example: 'Test CA' })
    @IsString()
    ca_name: string;

    @ApiProperty({ 
        description: 'Format của CSR', 
        enum: CSRFormat,
        example: CSRFormat.PEM
    })
    @IsEnum(CSRFormat)
    csr_format: CSRFormat;

    @ApiProperty({ 
        description: 'Các trường thông tin subject',
        type: SubjectFieldValuesDto
    })
    @ValidateNested()
    @Type(() => SubjectFieldValuesDto)
    subject_field_values: SubjectFieldValuesDto;

    @ApiPropertyOptional({ 
        description: 'Member ID (bắt buộc nếu key_usage_type là SIGNING)',
        example: 'CS:ORG:12345:SUBSYSTEM'
    })
    @IsOptional()
    @IsString()
    member_id?: string;
}

export class CSRQueryDto {
    @ApiPropertyOptional({ 
        description: 'Format của CSR để download', 
        enum: CSRFormat,
        default: CSRFormat.PEM
    })
    @IsOptional()
    @IsEnum(CSRFormat)
    csr_format?: CSRFormat;
}
