import { 
    Controller, 
    Get,
    UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ReqUser } from '@common/decorator/auth.decorator';
import { User } from '@module/user/entities/user.entity';
import { NotificationService } from '../services/intialize/notification.service';

@ApiTags('Notifications - Initialize')
@Controller('api/v1/initialize/notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService
    ) {}

    @Get('alerts')
    @ApiOperation({ 
        summary: 'Lấy danh sách alerts',
        description: 'Lấy tất cả alerts từ Security Server notifications'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Danh sách alerts',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                description: 'Alert object từ Security Server'
            }
        }
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Lỗi server khi lấy alerts'
    })
    async getAlerts(
        @ReqUser() user: User
    ) {
        return this.notificationService.getAlerts(user);
    }

    @Get('session-status')
    @ApiOperation({ 
        summary: 'Lấy session status',
        description: 'Lấy thông tin trạng thái session từ Security Server notifications'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Thông tin session status',
        schema: {
            type: 'object',
            description: 'Session status object từ Security Server'
        }
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Lỗi server khi lấy session status'
    })
    async getSessionStatus(
        @ReqUser() user: User
    ) {
        return this.notificationService.getSessionStatus(user);
    }
}
