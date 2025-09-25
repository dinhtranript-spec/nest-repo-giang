import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTokenDto {
    @ApiProperty({ 
        description: 'Tên mới của token',
        example: 'My Token Name'
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class ChangePinDto {
    @ApiProperty({ 
        description: 'PIN cũ',
        example: '1234'
    })
    @IsString()
    @IsNotEmpty()
    old_pin: string;

    @ApiProperty({ 
        description: 'PIN mới',
        example: '5678'
    })
    @IsString()
    @IsNotEmpty()
    new_pin: string;
}

export class LoginDto {
    @ApiProperty({ 
        description: 'Password để login vào token',
        example: 'mypassword'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class SubjectFieldValuesDto {
    @ApiProperty({ 
        description: 'Country code',
        example: 'VN'
    })
    @IsString()
    @IsNotEmpty()
    C: string;

    @ApiProperty({ 
        description: 'Common Name',
        example: 'Example Organization'
    })
    @IsString()
    @IsNotEmpty()
    CN: string;

    @ApiProperty({ 
        description: 'Serial Number',
        example: '12345'
    })
    @IsString()
    @IsNotEmpty()
    serialNumber: string;

    @ApiProperty({ 
        description: 'Organization',
        example: 'My Organization'
    })
    @IsString()
    @IsNotEmpty()
    O: string;
}

export class CSRGenerateRequestDto {
    @ApiProperty({ 
        description: 'Loại key usage',
        example: 'SIGNING',
        enum: ['SIGNING', 'AUTHENTICATION']
    })
    @IsString()
    @IsNotEmpty()
    key_usage_type: string;

    @ApiProperty({ 
        description: 'Tên CA',
        example: 'Test CA'
    })
    @IsString()
    @IsNotEmpty()
    ca_name: string;

    @ApiProperty({ 
        description: 'Format CSR',
        example: 'PEM',
        enum: ['PEM', 'DER']
    })
    @IsString()
    @IsNotEmpty()
    csr_format: string;

    @ApiProperty({ 
        description: 'Subject field values',
        type: SubjectFieldValuesDto
    })
    @ValidateNested()
    @Type(() => SubjectFieldValuesDto)
    subject_field_values: SubjectFieldValuesDto;

    @ApiPropertyOptional({ 
        description: 'Member ID (bắt buộc cho SIGNING key)',
        example: 'SUBSYSTEM:VN:ORG:12345:System'
    })
    @IsOptional()
    @IsString()
    member_id?: string;
}

export class AddKeyDto {
    @ApiProperty({ 
        description: 'Label của key',
        example: 'My Key Label'
    })
    @IsString()
    @IsNotEmpty()
    key_label: string;

    @ApiProperty({ 
        description: 'CSR generate request',
        type: CSRGenerateRequestDto
    })
    @ValidateNested()
    @Type(() => CSRGenerateRequestDto)
    csr_generate_request: CSRGenerateRequestDto;
}

export class FileUploadDto {
    @ApiProperty({ 
        type: 'string', 
        format: 'binary',
        description: 'Certificate file cần import'
    })
    file: Express.Multer.File;
}
