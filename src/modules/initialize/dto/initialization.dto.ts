import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class InitializeDto {
    @ApiProperty({ description: 'Owner member class' })
    @IsString()
    owner_member_class: string;

    @ApiProperty({ description: 'Owner member code' })
    @IsString()
    owner_member_code: string;

    @ApiProperty({ description: 'Security server code' })
    @IsString()
    security_server_code: string;

    @ApiProperty({ description: 'Software token PIN' })
    @IsString()
    software_token_pin: string;

    @ApiProperty({ description: 'Ignore warnings', default: false })
    @IsBoolean()
    ignore_warnings: boolean;
}

export class PostInitializeAdapterDataDto {
    @ApiProperty({ description: 'Mã tổ chức' })
    @IsString()
    organId: string;

    @ApiProperty({ description: 'Tên tổ chức' })
    @IsString()
    organName: string;

    @ApiProperty({ description: 'Địa chỉ tổ chức' })
    @IsString()
    organAdd: string;

    @ApiProperty({ description: 'Email' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Số điện thoại' })
    @IsString()
    telephone: string;

    @ApiPropertyOptional({ description: 'Số fax' })
    @IsString()
    fax?: string;

    @ApiPropertyOptional({ description: 'Website' })
    @IsString()
    website?: string;

    @ApiPropertyOptional({ description: 'Mô tả' })
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Host URL của server' })
    @IsString()
    host: string;
}

export class PostInitializeDto {
    @ApiProperty({ description: 'Dữ liệu adapter', type: PostInitializeAdapterDataDto })
    @ValidateNested()
    @Type(() => PostInitializeAdapterDataDto)
    adapter_data: PostInitializeAdapterDataDto;
}
