import { 
    Controller, 
    Get,
    UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ReqUser } from '@common/decorator/auth.decorator';
import { User } from '@module/user/entities/user.entity';
import { TimestampingService } from '../services/intialize/timeStampingService.service';

@ApiTags('Timestamping Services - Initialize')
@Controller('api/v1/initialize/timestamping-services')
@UseGuards(JwtAuthGuard)
export class TimestampingController {
    constructor(
        private readonly timestampingService: TimestampingService
    ) {}

    @Get('')
    @ApiOperation({ 
        summary: 'Lấy danh sách timestamping services',
        description: 'Lấy tất cả timestamping services từ Security Server'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Danh sách timestamping services',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: { 
                        type: 'string', 
                        description: 'Tên của timestamping service',
                        example: 'Main TSA Service'
                    },
                    url: { 
                        type: 'string', 
                        description: 'URL của timestamping service',
                        example: 'https://tsa.example.com/tsa'
                    }
                }
            }
        }
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Lỗi server khi lấy danh sách timestamping services'
    })
    async getAll(
        @ReqUser() user: User
    ) {
        return this.timestampingService.getAll(user);
    }
}
