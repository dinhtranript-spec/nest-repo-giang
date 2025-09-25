import { 
    Controller, 
    Get, 
    Param, 
    UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ReqUser } from '@common/decorator/auth.decorator';
import { User } from '@module/user/entities/user.entity';
import { MemberClassService } from '../services/intialize/memberclass.service';

@ApiTags('Member Class')
@Controller('api/v1/initialize/member-classes')
@UseGuards(JwtAuthGuard)
export class MemberClassController {
    constructor(private readonly memberClassService: MemberClassService) {}

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả member classes' })
    @ApiResponse({ 
        status: 200, 
        description: 'Danh sách member classes',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    code: { type: 'string', description: 'Mã member class' },
                    description: { type: 'string', description: 'Mô tả member class' }
                }
            }
        }
    })
    async getAllMemberClasses(@ReqUser() user: User) {
        return this.memberClassService.getAllMemberClasses(user);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy thông tin member class theo ID' })
    @ApiParam({ name: 'id', description: 'Member Class ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Thông tin member class',
        schema: {
            type: 'object',
            properties: {
                code: { type: 'string', description: 'Mã member class' },
                description: { type: 'string', description: 'Mô tả member class' }
            }
        }
    })
    async getMemberClassById(
        @ReqUser() user: User,
        @Param('id') id: string
    ) {
        return this.memberClassService.getMemberClassById(user, id);
    }
}
