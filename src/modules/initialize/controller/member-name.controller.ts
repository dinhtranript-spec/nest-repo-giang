import { 
    Controller, 
    Get, 
    Query,
    UseGuards,
    HttpStatus,
    Res
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ReqUser } from '@common/decorator/auth.decorator';
import { User } from '@module/user/entities/user.entity';
import { MemberNameService } from '../services/intialize/memberName.serice';
import { MemberNameQueryDto } from '../dto/member-name.dto';

@ApiTags('Member Name')
@Controller('api/v1/initialize/member-names')
@UseGuards(JwtAuthGuard)
export class MemberNameController {
    constructor(private readonly memberNameService: MemberNameService) {}

    @Get()
    @ApiOperation({ 
        summary: 'Lấy member name dựa trên member class và member code',
        description: 'Trả về thông tin member name cho member class và member code được cung cấp'
    })
    @ApiQuery({ name: 'member_class', required: false, type: String, description: 'Member class' })
    @ApiQuery({ name: 'member_code', required: false, type: String, description: 'Member code' })
    @ApiResponse({ 
        status: 200, 
        description: 'Thông tin member name',
        schema: {
            type: 'object',
            properties: {
                member_name: { type: 'string', description: 'Tên member' }
            }
        }
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Không tìm thấy member name (lỗi bị ẩn)',
        schema: {
            type: 'object',
            properties: {
                status: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Member name not found' },
                hide_error: { type: 'boolean', example: true },
                data: { type: 'null' }
            }
        }
    })
    async getMemberName(
        @ReqUser() user: User,
        @Query() queryParams: MemberNameQueryDto,
        @Res() res: Response
    ) {
        const result = await this.memberNameService.getMemberName(user, queryParams);
        
        // Xử lý response dựa trên kết quả
        if (result && typeof result === 'object' && result.status === 404 && result.hide_error) {
            // Trường hợp 404 với hide_error (tương tự Java callback_fail)
            return res.status(HttpStatus.NOT_FOUND).json({
                status: 404,
                message: result.message,
                hide_error: true,
                data: null
            });
        }
        
        // Trường hợp thành công
        return res.status(HttpStatus.OK).json(result);
    }
}
