import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class TSADto {
    @ApiProperty({ 
        description: 'Tên của Timestamping Service',
        example: 'Main TSA Service'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ 
        description: 'URL của Timestamping Service',
        example: 'https://tsa.example.com/tsa'
    })
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url: string;
}

export class FileUploadDto {
    @ApiProperty({ 
        type: 'string', 
        format: 'binary',
        description: 'File cần upload'
    })
    file: Express.Multer.File;
}

export interface FileDownloadResponse {
    data: any;
    filename: string;
    contentType: string;
}

export interface AnchorInfo {
    hash: string;
    generated_at: string;
    [key: string]: any;
}

export interface TLSCertificateInfo {
    hash: string;
    not_after: string;
    not_before: string;
    serial: string;
    subject: string;
    [key: string]: any;
}

export interface TSAInfo {
    name: string;
    url: string;
    [key: string]: any;
}
