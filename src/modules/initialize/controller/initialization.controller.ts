import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ReqUser } from '@common/decorator/auth.decorator';
import { User } from '@module/user/entities/user.entity';
import { InitializationService } from '../services/intialize/initialization.service';
import { InitializeDto, PostInitializeDto } from '../dto/initialization.dto';

@ApiTags('Initialization')
@Controller('api/v1/initialize/initialization')
@UseGuards(JwtAuthGuard)
export class InitializationController {
    constructor(private readonly initializationService: InitializationService) {}

    @Get('status')
    @ApiOperation({ summary: 'Lấy trạng thái khởi tạo của Security Server' })
    @ApiResponse({ 
        status: 200, 
        description: 'Trạng thái khởi tạo',
        schema: {
            type: 'object',
            properties: {
                initialized: { type: 'boolean' },
                software_token_id: { type: 'string' },
                software_token_status: { type: 'string' }
            }
        }
    })
    async getInitializationStatus(@ReqUser() user: User) {
        return this.initializationService.getInitializationStatus(user);
    }

    @Post()
    @ApiOperation({ summary: 'Khởi tạo Security Server' })
    @ApiBody({ type: InitializeDto })
    @ApiResponse({ 
        status: 201, 
        description: 'Security Server đã được khởi tạo thành công' 
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Thiếu thông tin bắt buộc hoặc dữ liệu không hợp lệ' 
    })
    async initialize(
        @ReqUser() user: User,
        @Body() initializeDto: InitializeDto
    ) {
        return this.initializationService.initialize(user, initializeDto);
    }

    @Post('post')
    @ApiOperation({ 
        summary: 'Thực hiện post-initialization setup',
        description: 'Tạo management client, organization và các service cần thiết sau khi khởi tạo Security Server'
    })
    @ApiBody({ type: PostInitializeDto })
    @ApiResponse({ 
        status: 201, 
        description: 'Post-initialization đã hoàn thành thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                ssId: { type: 'string' },
                organization: { type: 'object' },
                managementService: { type: 'object' },
                messageService: { type: 'object' }
            }
        }
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Thiếu thông tin bắt buộc hoặc dữ liệu không hợp lệ' 
    })
    async postInitialize(
        @ReqUser() user: User,
        @Body() postInitDto: PostInitializeDto
    ) {
        return this.initializationService.postInitialize(user, postInitDto);
    }
}
