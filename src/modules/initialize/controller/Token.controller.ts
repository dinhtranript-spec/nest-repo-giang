import { 
    Controller, 
    Get,
    Post,
    Put,
    Patch,
    Param,
    Body,
    UseGuards,
    ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ReqUser } from '@common/decorator/auth.decorator';
import { User } from '@module/user/entities/user.entity';
import { TokenService } from '../services/intialize/token.service';
import { UpdateTokenDto, ChangePinDto, LoginDto, AddKeyDto } from '../dto/token.dto';

@ApiTags('Tokens - Initialize')
@Controller('api/v1/initialize/tokens')
@UseGuards(JwtAuthGuard)
export class TokenController {
    constructor(
        private readonly tokenService: TokenService
    ) {}

    @Get('')
    @ApiOperation({ 
        summary: 'Lấy danh sách tất cả tokens',
        description: 'Lấy danh sách tất cả tokens từ Security Server'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Danh sách tokens',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    type: { type: 'string' },
                    status: { type: 'string' }
                }
            }
        }
    })
    async getAll(@ReqUser() user: User) {
        return this.tokenService.getAll(user);
    }

    @Get(':id')
    @ApiOperation({ 
        summary: 'Lấy token theo ID',
        description: 'Lấy thông tin chi tiết của token theo ID'
    })
    @ApiParam({ name: 'id', type: 'number', description: 'Token ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Thông tin token',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                type: { type: 'string' },
                status: { type: 'string' },
                keys: { type: 'array' }
            }
        }
    })
    async getById(
        @ReqUser() user: User,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.tokenService.getById(user, id);
    }

    @Patch(':id')
    @ApiOperation({ 
        summary: 'Cập nhật token theo ID',
        description: 'Cập nhật tên của token'
    })
    @ApiParam({ name: 'id', type: 'number', description: 'Token ID' })
    @ApiBody({ type: UpdateTokenDto })
    @ApiResponse({ 
        status: 200, 
        description: 'Cập nhật token thành công'
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Thiếu thông tin name'
    })
    async editById(
        @ReqUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTokenDto: UpdateTokenDto
    ) {
        return this.tokenService.editById(user, id, updateTokenDto);
    }

    @Put(':id/pin')
    @ApiOperation({ 
        summary: 'Thay đổi PIN của token',
        description: 'Thay đổi PIN của token theo ID'
    })
    @ApiParam({ name: 'id', type: 'number', description: 'Token ID' })
    @ApiBody({ type: ChangePinDto })
    @ApiResponse({ 
        status: 200, 
        description: 'Thay đổi PIN thành công'
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Thiếu thông tin old_pin hoặc new_pin'
    })
    async changePinById(
        @ReqUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body() changePinDto: ChangePinDto
    ) {
        return this.tokenService.changePinById(user, id, changePinDto);
    }

    @Put(':id/login')
    @ApiOperation({ 
        summary: 'Login vào token',
        description: 'Login vào token với password'
    })
    @ApiParam({ name: 'id', type: 'number', description: 'Token ID' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ 
        status: 200, 
        description: 'Login thành công'
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Thiếu thông tin password'
    })
    async loginById(
        @ReqUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body() loginDto: LoginDto
    ) {
        return this.tokenService.loginById(user, id, loginDto);
    }

    @Put(':id/logout')
    @ApiOperation({ 
        summary: 'Logout khỏi token',
        description: 'Logout khỏi token theo ID'
    })
    @ApiParam({ name: 'id', type: 'number', description: 'Token ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Logout thành công'
    })
    async logoutById(
        @ReqUser() user: User,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.tokenService.logoutById(user, id);
    }

    @Post(':id/keys')
    @ApiOperation({ 
        summary: 'Thêm Auth/Sign key vào token',
        description: 'Thêm Authentication hoặc Signing key vào token'
    })
    @ApiParam({ name: 'id', type: 'number', description: 'Token ID' })
    @ApiBody({ type: AddKeyDto })
    @ApiResponse({ 
        status: 200, 
        description: 'Thêm key thành công'
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Thiếu thông tin key_label hoặc csr_generate_request'
    })
    async addAuthSignKeyOfToken(
        @ReqUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body() addKeyDto: AddKeyDto
    ) {
        return this.tokenService.addAuthSignKeyOfToken(user, id, addKeyDto);
    }

    @Post(':id/keys-with-csrs')
    @ApiOperation({ 
        summary: 'Thêm Auth/Sign key với CSRs vào token',
        description: 'Thêm Authentication hoặc Signing key với CSRs vào token'
    })
    @ApiParam({ name: 'id', type: 'number', description: 'Token ID' })
    @ApiBody({ type: AddKeyDto })
    @ApiResponse({ 
        status: 200, 
        description: 'Thêm key với CSRs thành công'
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Thiếu thông tin key_label hoặc csr_generate_request'
    })
    async addAuthSignKeyWithCsrsOfToken(
        @ReqUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body() addKeyDto: AddKeyDto
    ) {
        return this.tokenService.addAuthSignKeyWithCsrsOfToken(user, id, addKeyDto);
    }
}