import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Body, 
    Param, 
    Query,
    UseGuards,
    Header,
    Res
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ReqUser } from '@common/decorator/auth.decorator';
import { User } from '@module/user/entities/user.entity';
import { KeyService } from '../services/intialize/key.service';
import { UpdateKeyDto, GenerateCSRDto, CSRQueryDto } from '../dto/key.dto';

@ApiTags('Key Management')
@Controller('api/v1/initialize/keys')
@UseGuards(JwtAuthGuard)
export class KeyController {
    constructor(private readonly keyService: KeyService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Lấy thông tin key theo ID' })
    @ApiParam({ name: 'id', description: 'Key ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Thông tin key',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                usage: { type: 'string' },
                available: { type: 'boolean' },
                saved_to_configuration: { type: 'boolean' }
            }
        }
    })
    async getKeyById(
        @ReqUser() user: User,
        @Param('id') id: string
    ) {
        return this.keyService.getKeyById(user, id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Xóa key theo ID' })
    @ApiParam({ name: 'id', description: 'Key ID' })
    @ApiResponse({ status: 200, description: 'Key đã được xóa thành công' })
    async deleteKeyById(
        @ReqUser() user: User,
        @Param('id') id: string
    ) {
        return this.keyService.deleteKeyById(user, id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Cập nhật thông tin key theo ID' })
    @ApiParam({ name: 'id', description: 'Key ID' })
    @ApiBody({ type: UpdateKeyDto })
    @ApiResponse({ status: 200, description: 'Key đã được cập nhật thành công' })
    @ApiResponse({ status: 400, description: 'Thiếu thông tin name' })
    async updateKeyById(
        @ReqUser() user: User,
        @Param('id') id: string,
        @Body() updateDto: UpdateKeyDto
    ) {
        return this.keyService.updateKeyById(user, id, updateDto);
    }

    @Post(':id/csrs')
    @ApiOperation({ 
        summary: 'Tạo CSR (Certificate Signing Request) cho key',
        description: 'Tạo Certificate Signing Request cho key. Trả về CSR dưới dạng file để download.'
    })
    @ApiParam({ name: 'id', description: 'Key ID' })
    @ApiBody({ type: GenerateCSRDto })
    @ApiResponse({ 
        status: 201, 
        description: 'CSR đã được tạo thành công',
        headers: {
            'Content-Disposition': {
                description: 'Attachment với filename',
                schema: { type: 'string' }
            },
            'Content-Type': {
                description: 'Content type của file CSR',
                schema: { type: 'string' }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Thiếu thông tin bắt buộc hoặc dữ liệu không hợp lệ' })
    async generateCSR(
        @ReqUser() user: User,
        @Param('id') keyId: string,
        @Body() generateCSRDto: GenerateCSRDto,
        @Res() res: Response
    ) {
        const result = await this.keyService.generateCSR(user, keyId, generateCSRDto);
        
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        
        return res.send(result.data);
    }

    @Get(':keyId/csrs/:id')
    @ApiOperation({ 
        summary: 'Download CSR theo key ID và CSR ID',
        description: 'Download Certificate Signing Request dưới dạng file.'
    })
    @ApiParam({ name: 'keyId', description: 'Key ID' })
    @ApiParam({ name: 'id', description: 'CSR ID' })
    @ApiQuery({ name: 'csr_format', required: false, enum: ['PEM', 'DER'], description: 'Format CSR (mặc định: PEM)' })
    @ApiResponse({ 
        status: 200, 
        description: 'File CSR',
        headers: {
            'Content-Disposition': {
                description: 'Attachment với filename',
                schema: { type: 'string' }
            },
            'Content-Type': {
                description: 'Content type của file CSR',
                schema: { type: 'string' }
            }
        }
    })
    async downloadCSR(
        @ReqUser() user: User,
        @Param('keyId') keyId: string,
        @Param('id') csrId: string,
        @Query() queryParams: CSRQueryDto,
        @Res() res: Response
    ) {
        const result = await this.keyService.downloadCSR(user, keyId, csrId, queryParams);
        
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        
        return res.send(result.data);
    }

    @Delete(':keyId/csrs/:id')
    @ApiOperation({ summary: 'Xóa CSR theo key ID và CSR ID' })
    @ApiParam({ name: 'keyId', description: 'Key ID' })
    @ApiParam({ name: 'id', description: 'CSR ID' })
    @ApiResponse({ status: 200, description: 'CSR đã được xóa thành công' })
    async deleteCSR(
        @ReqUser() user: User,
        @Param('keyId') keyId: string,
        @Param('id') csrId: string
    ) {
        return this.keyService.deleteCSR(user, keyId, csrId);
    }

    @Get(':keyId/csrs/:id/possible-actions')
    @ApiOperation({ summary: 'Lấy các possible actions cho CSR' })
    @ApiParam({ name: 'keyId', description: 'Key ID' })
    @ApiParam({ name: 'id', description: 'CSR ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Danh sách possible actions cho CSR',
        schema: {
            type: 'array',
            items: { type: 'string' }
        }
    })
    async getCSRPossibleActions(
        @ReqUser() user: User,
        @Param('keyId') keyId: string,
        @Param('id') csrId: string
    ) {
        return this.keyService.getCSRPossibleActions(user, keyId, csrId);
    }

    @Get(':id/possible-actions')
    @ApiOperation({ summary: 'Lấy các possible actions cho key' })
    @ApiParam({ name: 'id', description: 'Key ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Danh sách possible actions cho key',
        schema: {
            type: 'array',
            items: { type: 'string' }
        }
    })
    async getKeyPossibleActions(
        @ReqUser() user: User,
        @Param('id') keyId: string
    ) {
        return this.keyService.getKeyPossibleActions(user, keyId);
    }
}
