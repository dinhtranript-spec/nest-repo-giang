import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ClientQueryDto {
    @ApiPropertyOptional({ description: 'Instance' })
    @IsOptional()
    @IsString()
    instance?: string;

    @ApiPropertyOptional({ description: 'Member class' })
    @IsOptional()
    @IsString()
    member_class?: string;

    @ApiPropertyOptional({ description: 'Member code' })
    @IsOptional()
    @IsString()
    member_code?: string;

    @ApiPropertyOptional({ description: 'Show members' })
    @IsOptional()
    @IsBoolean()
    show_members?: boolean;

    @ApiPropertyOptional({ description: 'Exclude local' })
    @IsOptional()
    @IsBoolean()
    exclude_local?: boolean;

    @ApiPropertyOptional({ description: 'Internal search' })
    @IsOptional()
    @IsBoolean()
    internal_search?: boolean;
}

export class ServiceClientQueryDto {
    @ApiPropertyOptional({ description: 'Member name group description' })
    @IsOptional()
    @IsString()
    member_name_group_description?: string;

    @ApiPropertyOptional({ description: 'Member group code' })
    @IsOptional()
    @IsString()
    member_group_code?: string;

    @ApiPropertyOptional({ description: 'Subsystem code' })
    @IsOptional()
    @IsString()
    subsystem_code?: string;

    @ApiPropertyOptional({ description: 'Instance' })
    @IsOptional()
    @IsString()
    instance?: string;

    @ApiPropertyOptional({ description: 'Member class' })
    @IsOptional()
    @IsString()
    member_class?: string;

    @ApiPropertyOptional({ description: 'Service client type' })
    @IsOptional()
    @IsString()
    service_client_type?: string;
}

export class ClientInfoDto {
    @ApiProperty({ description: 'Tên thành viên' })
    @IsString()
    member_name: string;

    @ApiProperty({ description: 'Lớp thành viên' })
    @IsString()
    member_class: string;

    @ApiProperty({ description: 'Mã thành viên' })
    @IsString()
    member_code: string;

    @ApiPropertyOptional({ description: 'Mã hệ thống con' })
    @IsOptional()
    @IsString()
    subsystem_code?: string;

    @ApiPropertyOptional({ description: 'Loại kết nối' })
    @IsOptional()
    @IsString()
    connection_type?: string;
}

export class AdapterDataDto {
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

    @ApiProperty({ description: 'Số fax' })
    @IsString()
    fax: string;

    @ApiProperty({ description: 'Website' })
    @IsString()
    website: string;

    @ApiPropertyOptional({ description: 'Mô tả' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: 'Tổ chức phụ trách' })
    @IsOptional()
    @IsString()
    organizationInCharge?: string;
}

export class CreateClientDto {
    @ApiProperty({ description: 'Thông tin client', type: ClientInfoDto })
    @ValidateNested()
    @Type(() => ClientInfoDto)
    client: ClientInfoDto;

    @ApiProperty({ description: 'Dữ liệu adapter', type: AdapterDataDto })
    @ValidateNested()
    @Type(() => AdapterDataDto)
    adapter_data: AdapterDataDto;

    @ApiPropertyOptional({ description: 'Bỏ qua cảnh báo', default: false })
    @IsOptional()
    @IsBoolean()
    ignore_warnings?: boolean;
}

export class UpdateAdapterDataDto {
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

    @ApiProperty({ description: 'Số fax' })
    @IsString()
    fax: string;

    @ApiProperty({ description: 'Website' })
    @IsString()
    website: string;

    @ApiPropertyOptional({ description: 'Tổ chức phụ trách' })
    @IsOptional()
    @IsString()
    organizationInCharge?: string;
}

export class UpdateClientDto {
    @ApiProperty({ description: 'Loại kết nối' })
    @IsString()
    connection_type: string;

    @ApiProperty({ description: 'Dữ liệu adapter', type: UpdateAdapterDataDto })
    @ValidateNested()
    @Type(() => UpdateAdapterDataDto)
    adapter_data: UpdateAdapterDataDto;
}

export class ServiceDescriptionDto {
    @ApiProperty({ description: 'Mô tả service description' })
    @IsString()
    description: string;
}

export class ServiceDto {
    @ApiProperty({ description: 'Mô tả service' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Có public không' })
    @IsString()
    isPublic: string;

    @ApiProperty({ description: 'Cho công dân không' })
    @IsString()
    isForCitizen: string;

    @ApiProperty({ description: 'Loại service' })
    @IsString()
    type: string;
}

export class ServiceAdapterDataDto {
    @ApiProperty({ description: 'Service description', type: ServiceDescriptionDto })
    @ValidateNested()
    @Type(() => ServiceDescriptionDto)
    service_description: ServiceDescriptionDto;

    @ApiProperty({ description: 'Service', type: ServiceDto })
    @ValidateNested()
    @Type(() => ServiceDto)
    service: ServiceDto;
}

export class AddServiceDescriptionDto {
    @ApiProperty({ description: 'Loại service (WSDL/REST)' })
    @IsString()
    type: string;

    @ApiProperty({ description: 'URL của service' })
    @IsString()
    url: string;

    @ApiPropertyOptional({ description: 'Mã REST service (bắt buộc nếu type là REST)' })
    @IsOptional()
    @IsString()
    rest_service_code?: string;

    @ApiProperty({ description: 'Dữ liệu adapter', type: ServiceAdapterDataDto })
    @ValidateNested()
    @Type(() => ServiceAdapterDataDto)
    adapter_data: ServiceAdapterDataDto;
}

export class AccessRightItemDto {
    @ApiProperty({ description: 'Mã service' })
    @IsString()
    service_code: string;
}

export class AccessRightsDto {
    @ApiProperty({ description: 'Danh sách access rights', type: [AccessRightItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AccessRightItemDto)
    items: AccessRightItemDto[];
}

