import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Param, 
    Body, 
    HttpStatus,
    HttpException,
    ValidationPipe
} from "@nestjs/common";
import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiParam, 
    ApiBody,
    ApiBearerAuth
} from "@nestjs/swagger";
import { ApiKeyService } from "../services/intialize/apiKey.service";

// DTO interface cho API Key
interface ApiKeyDto {
    roles: string[];
}

@Controller("api/v1/initialize/api-keys")
@ApiTags("API Key Initialize")
@ApiBearerAuth()
export class APIKeyController {
    constructor(private readonly apiKeyService: ApiKeyService) {}

    @Get()
    @ApiOperation({ summary: "Lấy tất cả API keys" })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: "Lấy danh sách API keys thành công" 
    })
    @ApiResponse({ 
        status: HttpStatus.INTERNAL_SERVER_ERROR, 
        description: "Lỗi server" 
    })
    async getAll() {
        try {
            return await this.apiKeyService.getAll();
        } catch (error) {
            throw new HttpException(
                error.message || 'Lỗi khi lấy danh sách API keys',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Post()
    @ApiOperation({ summary: "Tạo API key mới" })
    @ApiBody({ 
        description: "Thông tin API key", 
        schema: {
            type: 'object',
            properties: {
                roles: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Danh sách roles'
                }
            },
            required: ['roles']
        }
    })
    @ApiResponse({ 
        status: HttpStatus.CREATED, 
        description: "Tạo API key thành công" 
    })
    @ApiResponse({ 
        status: HttpStatus.BAD_REQUEST, 
        description: "Thiếu thông tin roles" 
    })
    @ApiResponse({ 
        status: HttpStatus.INTERNAL_SERVER_ERROR, 
        description: "Lỗi server" 
    })
    async create(@Body() apiKeyDto: ApiKeyDto) {
        try {
            if (!apiKeyDto.roles || !Array.isArray(apiKeyDto.roles)) {
                throw new HttpException(
                    'Thiếu thông tin roles',
                    HttpStatus.BAD_REQUEST
                );
            }
            return await this.apiKeyService.create(apiKeyDto);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                error.message || 'Lỗi khi tạo API key',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get(":id")
    @ApiOperation({ summary: "Lấy API key theo ID" })
    @ApiParam({ 
        name: 'id', 
        description: 'ID của API key',
        type: 'string'
    })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: "Lấy API key thành công" 
    })
    @ApiResponse({ 
        status: HttpStatus.NOT_FOUND, 
        description: "Không tìm thấy API key" 
    })
    @ApiResponse({ 
        status: HttpStatus.INTERNAL_SERVER_ERROR, 
        description: "Lỗi server" 
    })
    async getById(@Param("id") id: string) {
        try {
            return await this.apiKeyService.getById(id);
        } catch (error) {
            throw new HttpException(
                error.message || 'Lỗi khi lấy API key',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Put(":id")
    @ApiOperation({ summary: "Cập nhật API key theo ID" })
    @ApiParam({ 
        name: 'id', 
        description: 'ID của API key cần cập nhật',
        type: 'string'
    })
    @ApiBody({ 
        description: "Thông tin API key cập nhật", 
        schema: {
            type: 'object',
            properties: {
                roles: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Danh sách roles mới'
                }
            },
            required: ['roles']
        }
    })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: "Cập nhật API key thành công" 
    })
    @ApiResponse({ 
        status: HttpStatus.BAD_REQUEST, 
        description: "Thiếu thông tin roles" 
    })
    @ApiResponse({ 
        status: HttpStatus.NOT_FOUND, 
        description: "Không tìm thấy API key" 
    })
    @ApiResponse({ 
        status: HttpStatus.INTERNAL_SERVER_ERROR, 
        description: "Lỗi server" 
    })
    async update(@Param("id") id: string, @Body() apiKeyDto: ApiKeyDto) {
        try {
            if (!apiKeyDto.roles || !Array.isArray(apiKeyDto.roles)) {
                throw new HttpException(
                    'Thiếu thông tin roles',
                    HttpStatus.BAD_REQUEST
                );
            }
            return await this.apiKeyService.update(id, apiKeyDto);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                error.message || 'Lỗi khi cập nhật API key',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Delete(":id")
    @ApiOperation({ summary: "Xóa API key theo ID" })
    @ApiParam({ 
        name: 'id', 
        description: 'ID của API key cần xóa',
        type: 'string'
    })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: "Xóa API key thành công" 
    })
    @ApiResponse({ 
        status: HttpStatus.NOT_FOUND, 
        description: "Không tìm thấy API key" 
    })
    @ApiResponse({ 
        status: HttpStatus.INTERNAL_SERVER_ERROR, 
        description: "Lỗi server" 
    })
    async delete(@Param("id") id: string) {
        try {
            return await this.apiKeyService.delete(id);
        } catch (error) {
            throw new HttpException(
                error.message || 'Lỗi khi xóa API key',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}