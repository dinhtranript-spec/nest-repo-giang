import { 
    Controller, 
    Get,
    Post,
    Put,
    Body,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Res,
    HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ReqUser } from '@common/decorator/auth.decorator';
import { User } from '@module/user/entities/user.entity';
import { SystemService } from '../services/intialize/system.service';
import { TSADto, FileUploadDto } from '../dto/system.dto';

@ApiTags('System - Initialize')
@Controller('api/v1/initialize/system')
@UseGuards(JwtAuthGuard)
export class SystemController {
    constructor(
        private readonly systemService: SystemService
    ) {}

    // ==================== ANCHOR ENDPOINTS ====================

    @Get('anchor')
    @ApiOperation({ 
        summary: 'Lấy thông tin anchor',
        description: 'Lấy thông tin anchor hiện tại từ Security Server'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Thông tin anchor',
        schema: {
            type: 'object',
            properties: {
                hash: { type: 'string' },
                generated_at: { type: 'string' }
            }
        }
    })
    async getAnchor(@ReqUser() user: User) {
        return this.systemService.getAnchor(user);
    }

    @Post('anchor')
    @ApiOperation({ 
        summary: 'Upload anchor file',
        description: 'Upload anchor file mới lên Security Server'
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Anchor file',
        type: FileUploadDto
    })
    @UseInterceptors(FileInterceptor('file'))
    @ApiResponse({ 
        status: 200, 
        description: 'Upload anchor thành công'
    })
    async uploadAnchor(
        @ReqUser() user: User,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.systemService.uploadAnchor(user, file);
    }

    @Put('anchor')
    @ApiOperation({ 
        summary: 'Cập nhật anchor file',
        description: 'Cập nhật anchor file hiện tại trên Security Server'
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Anchor file',
        type: FileUploadDto
    })
    @UseInterceptors(FileInterceptor('file'))
    @ApiResponse({ 
        status: 200, 
        description: 'Cập nhật anchor thành công'
    })
    async editAnchor(
        @ReqUser() user: User,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.systemService.editAnchor(user, file);
    }

    @Get('anchor/download')
    @ApiOperation({ 
        summary: 'Download anchor file',
        description: 'Download anchor file hiện tại từ Security Server'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Anchor file',
        headers: {
            'Content-Disposition': {
                description: 'attachment; filename="anchor_YYYY-MM-DD_HH-MM-SS.xml"'
            },
            'Content-Type': {
                description: 'application/xml'
            }
        }
    })
    async downloadAnchor(
        @ReqUser() user: User,
        @Res() res: Response
    ) {
        const result = await this.systemService.downloadAnchor(user);
        
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        return res.status(HttpStatus.OK).send(result.data);
    }

    // ==================== CERTIFICATE ENDPOINTS ====================

    @Get('certificate')
    @ApiOperation({ 
        summary: 'Lấy thông tin TLS certificate',
        description: 'Lấy thông tin TLS certificate hiện tại từ Security Server'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Thông tin TLS certificate',
        schema: {
            type: 'object',
            properties: {
                hash: { type: 'string' },
                not_after: { type: 'string' },
                not_before: { type: 'string' },
                serial: { type: 'string' },
                subject: { type: 'string' }
            }
        }
    })
    async getTLSCertificate(@ReqUser() user: User) {
        return this.systemService.getTLSCertificate(user);
    }

    @Post('certificate')
    @ApiOperation({ 
        summary: 'Generate TLS certificate',
        description: 'Tạo TLS certificate mới trên Security Server'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Generate TLS certificate thành công'
    })
    async generateTLSCertificate(@ReqUser() user: User) {
        return this.systemService.generateTLSCertificate(user);
    }

    @Post('certificate/import')
    @ApiOperation({ 
        summary: 'Import TLS certificate',
        description: 'Import TLS certificate từ file lên Security Server'
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Certificate file',
        type: FileUploadDto
    })
    @UseInterceptors(FileInterceptor('file'))
    @ApiResponse({ 
        status: 200, 
        description: 'Import TLS certificate thành công'
    })
    async importTLSCertificate(
        @ReqUser() user: User,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.systemService.importTLSCertificate(user, file);
    }

    @Get('certificate/export')
    @ApiOperation({ 
        summary: 'Export TLS certificate',
        description: 'Export TLS certificate từ Security Server'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'TLS certificate file',
        headers: {
            'Content-Disposition': {
                description: 'attachment; filename="cert.tar.gz"'
            },
            'Content-Type': {
                description: 'application/gzip'
            }
        }
    })
    async exportTLSCertificate(
        @ReqUser() user: User,
        @Res() res: Response
    ) {
        const result = await this.systemService.exportTLSCertificate(user);
        
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        return res.status(HttpStatus.OK).send(result.data);
    }

    // ==================== TSA ENDPOINTS ====================

    @Get('timestamping-services')
    @ApiOperation({ 
        summary: 'Lấy danh sách TSA',
        description: 'Lấy danh sách tất cả Timestamping Services từ Security Server'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Danh sách TSA',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    url: { type: 'string' }
                }
            }
        }
    })
    async getAllTSA(@ReqUser() user: User) {
        return this.systemService.getAllTSA(user);
    }

    @Post('timestamping-services')
    @ApiOperation({ 
        summary: 'Thêm TSA',
        description: 'Thêm Timestamping Service mới vào Security Server'
    })
    @ApiBody({ type: TSADto })
    @ApiResponse({ 
        status: 200, 
        description: 'Thêm TSA thành công'
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Thiếu thông tin name hoặc url'
    })
    async addTSA(
        @ReqUser() user: User,
        @Body() tsaDto: TSADto
    ) {
        return this.systemService.addTSA(user, tsaDto);
    }

    @Post('timestamping-services/delete')
    @ApiOperation({ 
        summary: 'Xóa TSA',
        description: 'Xóa Timestamping Service khỏi Security Server'
    })
    @ApiBody({ type: TSADto })
    @ApiResponse({ 
        status: 200, 
        description: 'Xóa TSA thành công'
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Thiếu thông tin name hoặc url'
    })
    async deleteTSA(
        @ReqUser() user: User,
        @Body() tsaDto: TSADto
    ) {
        return this.systemService.deleteTSA(user, tsaDto);
    }
}
