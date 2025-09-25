import { 
    Controller, 
    Get,
    Post,
    Put,
    Delete,
    Param,
    UseGuards,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ReqUser } from '@common/decorator/auth.decorator';
import { User } from '@module/user/entities/user.entity';
import { TokenCertificateService } from '../services/intialize/tokenCertificate.service';
import { FileUploadDto } from '../dto/token.dto';

@ApiTags('Token Certificates - Initialize')
@Controller('api/v1/initialize/token-certificates')
@UseGuards(JwtAuthGuard)
export class TokenCertificateController {
    constructor(
        private readonly tokenCertificateService: TokenCertificateService
    ) {}

    @Post('')
    @ApiOperation({ 
        summary: 'Import certificate mới',
        description: 'Import certificate file mới vào Security Server'
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Certificate file',
        type: FileUploadDto
    })
    @UseInterceptors(FileInterceptor('file'))
    @ApiResponse({ 
        status: 200, 
        description: 'Import certificate thành công'
    })
    async importNew(
        @ReqUser() user: User,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.tokenCertificateService.importNew(user, file);
    }

    @Get(':hash')
    @ApiOperation({ 
        summary: 'Lấy certificate theo hash',
        description: 'Lấy thông tin certificate theo hash'
    })
    @ApiParam({ name: 'hash', type: 'string', description: 'Certificate hash' })
    @ApiResponse({ 
        status: 200, 
        description: 'Thông tin certificate',
        schema: {
            type: 'object',
            properties: {
                hash: { type: 'string' },
                certificate_details: { type: 'object' },
                status: { type: 'string' },
                owner_id: { type: 'string' }
            }
        }
    })
    async getByHash(
        @ReqUser() user: User,
        @Param('hash') hash: string
    ) {
        return this.tokenCertificateService.getByHash(user, hash);
    }

    @Delete(':hash')
    @ApiOperation({ 
        summary: 'Xóa certificate theo hash',
        description: 'Xóa certificate khỏi Security Server'
    })
    @ApiParam({ name: 'hash', type: 'string', description: 'Certificate hash' })
    @ApiResponse({ 
        status: 200, 
        description: 'Xóa certificate thành công'
    })
    async deleteByHash(
        @ReqUser() user: User,
        @Param('hash') hash: string
    ) {
        return this.tokenCertificateService.deleteByHash(user, hash);
    }

    @Put(':hash/activate')
    @ApiOperation({ 
        summary: 'Kích hoạt certificate',
        description: 'Kích hoạt certificate theo hash'
    })
    @ApiParam({ name: 'hash', type: 'string', description: 'Certificate hash' })
    @ApiResponse({ 
        status: 200, 
        description: 'Kích hoạt certificate thành công'
    })
    async activateByHash(
        @ReqUser() user: User,
        @Param('hash') hash: string
    ) {
        return this.tokenCertificateService.activateByHash(user, hash);
    }

    @Put(':hash/disable')
    @ApiOperation({ 
        summary: 'Vô hiệu hóa certificate',
        description: 'Vô hiệu hóa certificate theo hash'
    })
    @ApiParam({ name: 'hash', type: 'string', description: 'Certificate hash' })
    @ApiResponse({ 
        status: 200, 
        description: 'Vô hiệu hóa certificate thành công'
    })
    async disableByHash(
        @ReqUser() user: User,
        @Param('hash') hash: string
    ) {
        return this.tokenCertificateService.disableByHash(user, hash);
    }

    @Get(':hash/possible-actions')
    @ApiOperation({ 
        summary: 'Lấy danh sách hành động có thể thực hiện',
        description: 'Lấy danh sách các hành động có thể thực hiện với certificate'
    })
    @ApiParam({ name: 'hash', type: 'string', description: 'Certificate hash' })
    @ApiResponse({ 
        status: 200, 
        description: 'Danh sách hành động',
        schema: {
            type: 'array',
            items: {
                type: 'string',
                enum: ['ACTIVATE', 'DISABLE', 'DELETE', 'REGISTER', 'UNREGISTER']
            }
        }
    })
    async getAllPossibleActionsByHash(
        @ReqUser() user: User,
        @Param('hash') hash: string
    ) {
        return this.tokenCertificateService.getAllPossibleActionsByHash(user, hash);
    }

    @Put(':hash/register')
    @ApiOperation({ 
        summary: 'Đăng ký certificate',
        description: 'Đăng ký certificate với Security Server IP'
    })
    @ApiParam({ name: 'hash', type: 'string', description: 'Certificate hash' })
    @ApiResponse({ 
        status: 200, 
        description: 'Đăng ký certificate thành công'
    })
    async registerByHash(
        @ReqUser() user: User,
        @Param('hash') hash: string
    ) {
        return this.tokenCertificateService.registerByHash(user, hash);
    }

    @Put(':hash/unregister')
    @ApiOperation({ 
        summary: 'Hủy đăng ký certificate',
        description: 'Hủy đăng ký certificate với Security Server IP'
    })
    @ApiParam({ name: 'hash', type: 'string', description: 'Certificate hash' })
    @ApiResponse({ 
        status: 200, 
        description: 'Hủy đăng ký certificate thành công'
    })
    async unregisterByHash(
        @ReqUser() user: User,
        @Param('hash') hash: string
    ) {
        return this.tokenCertificateService.unregisterByHash(user, hash);
    }
}
