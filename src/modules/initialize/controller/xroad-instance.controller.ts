import { 
    Controller, 
    Get,
    UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ReqUser } from '@common/decorator/auth.decorator';
import { User } from '@module/user/entities/user.entity';
import { XroadInstanceService } from '../services/intialize/xroadInstance.service';

@ApiTags('X-Road Instances - Initialize')
@Controller('api/v1/initialize/xroad-instances')
@UseGuards(JwtAuthGuard)
export class XroadInstanceController {
    constructor(
        private readonly xroadInstanceService: XroadInstanceService
    ) {}

    @Get('')
    @ApiOperation({ 
        summary: 'Lấy danh sách X-Road instances',
        description: 'Lấy tất cả X-Road instances từ Security Server'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Danh sách X-Road instances',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    instance_id: { 
                        type: 'string', 
                        description: 'ID của X-Road instance',
                        example: 'DEV'
                    },
                    type: { 
                        type: 'string', 
                        description: 'Loại instance',
                        example: 'CENTRAL_SERVER'
                    }
                }
            }
        }
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Lỗi server khi lấy danh sách X-Road instances'
    })
    async getAll(
        @ReqUser() user: User
    ) {
        return this.xroadInstanceService.getAll(user);
    }
}
