import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Patch, 
    Delete, 
    Body, 
    Param, 
    Query, 
    UseGuards,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { ReqUser } from '@common/decorator/auth.decorator';
import { User } from '@module/user/entities/user.entity';
import { ClientService } from '../services/intialize/Client.service';
import { 
    ClientQueryDto, 
    ServiceClientQueryDto, 
    CreateClientDto, 
    UpdateClientDto, 
    AddServiceDescriptionDto, 
    AccessRightsDto 
} from '../dto/client.dto';

@ApiTags('Client Initialize')
@Controller('api/v1/initialize/clients')
@UseGuards(JwtAuthGuard)
export class ClientInitializeController {
    constructor(private readonly clientService: ClientService) {}

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả clients' })
    @ApiQuery({ name: 'instance', required: false, type: String })
    @ApiQuery({ name: 'member_class', required: false, type: String })
    @ApiQuery({ name: 'member_code', required: false, type: String })
    @ApiQuery({ name: 'show_members', required: false, type: Boolean })
    @ApiQuery({ name: 'exclude_local', required: false, type: Boolean })
    @ApiQuery({ name: 'internal_search', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Danh sách clients' })
    async getAllClients(
        @ReqUser() user: User,
        @Query() queryParams: ClientQueryDto
    ) {
        return this.clientService.getAllClients(user, queryParams);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy client theo ID' })
    @ApiParam({ name: 'id', description: 'Client ID' })
    @ApiResponse({ status: 200, description: 'Thông tin client' })
    async getClientById(
        @ReqUser() user: User,
        @Param('id') id: string
    ) {
        return this.clientService.getClientById(user, id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Xóa client theo ID' })
    @ApiParam({ name: 'id', description: 'Client ID' })
    @ApiResponse({ status: 200, description: 'Client đã được xóa' })
    async deleteClientById(
        @ReqUser() user: User,
        @Param('id') id: string
    ) {
        return this.clientService.deleteClientById(user, id);
    }

    @Post()
    @ApiOperation({ summary: 'Tạo client mới' })
    @ApiBody({ type: CreateClientDto })
    @ApiResponse({ status: 201, description: 'Client đã được tạo' })
    async createClient(
        @ReqUser() user: User,
        @Body() createDto: CreateClientDto
    ) {
        return this.clientService.createClient(user, createDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Cập nhật client theo ID' })
    @ApiParam({ name: 'id', description: 'Client ID' })
    @ApiBody({ type: UpdateClientDto })
    @ApiResponse({ status: 200, description: 'Client đã được cập nhật' })
    async updateClientById(
        @ReqUser() user: User,
        @Param('id') id: string,
        @Body() updateDto: UpdateClientDto
    ) {
        return this.clientService.updateClientById(user, id, updateDto);
    }

    @Put(':id/register')
    @ApiOperation({ summary: 'Đăng ký client' })
    @ApiParam({ name: 'id', description: 'Client ID' })
    @ApiResponse({ status: 200, description: 'Client đã được đăng ký' })
    async registerClient(
        @ReqUser() user: User,
        @Param('id') id: string
    ) {
        return this.clientService.registerClient(user, id);
    }

    @Put(':id/unregister')
    @ApiOperation({ summary: 'Hủy đăng ký client' })
    @ApiParam({ name: 'id', description: 'Client ID' })
    @ApiResponse({ status: 200, description: 'Client đã được hủy đăng ký' })
    async unregisterClient(
        @ReqUser() user: User,
        @Param('id') id: string
    ) {
        return this.clientService.unregisterClient(user, id);
    }

    @Get(':id/service-clients')
    @ApiOperation({ summary: 'Lấy service clients của client' })
    @ApiParam({ name: 'id', description: 'Client ID' })
    @ApiResponse({ status: 200, description: 'Danh sách service clients' })
    async getServiceClients(
        @ReqUser() user: User,
        @Param('id') id: string
    ) {
        return this.clientService.getServiceClients(user, id);
    }

    @Get(':clientId/service-clients/:serviceClientId')
    @ApiOperation({ summary: 'Lấy service client theo ID' })
    @ApiParam({ name: 'clientId', description: 'Client ID' })
    @ApiParam({ name: 'serviceClientId', description: 'Service Client ID' })
    @ApiResponse({ status: 200, description: 'Thông tin service client' })
    async getServiceClientById(
        @ReqUser() user: User,
        @Param('clientId') clientId: string,
        @Param('serviceClientId') serviceClientId: string
    ) {
        return this.clientService.getServiceClientById(user, clientId, serviceClientId);
    }

    @Get(':clientId/service-clients/:serviceClientId/access-rights')
    @ApiOperation({ summary: 'Lấy access rights của service client' })
    @ApiParam({ name: 'clientId', description: 'Client ID' })
    @ApiParam({ name: 'serviceClientId', description: 'Service Client ID' })
    @ApiResponse({ status: 200, description: 'Danh sách access rights' })
    async getAccessRights(
        @ReqUser() user: User,
        @Param('clientId') clientId: string,
        @Param('serviceClientId') serviceClientId: string
    ) {
        return this.clientService.getAccessRights(user, clientId, serviceClientId);
    }

    @Post(':clientId/service-clients/:serviceClientId/access-rights')
    @ApiOperation({ summary: 'Thêm access rights cho service client' })
    @ApiParam({ name: 'clientId', description: 'Client ID' })
    @ApiParam({ name: 'serviceClientId', description: 'Service Client ID' })
    @ApiBody({ type: AccessRightsDto })
    @ApiResponse({ status: 201, description: 'Access rights đã được thêm' })
    async addAccessRights(
        @ReqUser() user: User,
        @Param('clientId') clientId: string,
        @Param('serviceClientId') serviceClientId: string,
        @Body() accessRightsDto: AccessRightsDto
    ) {
        return this.clientService.addAccessRights(user, clientId, serviceClientId, accessRightsDto);
    }

    @Post(':clientId/service-clients/:serviceClientId/access-rights/delete')
    @ApiOperation({ summary: 'Xóa access rights của service client' })
    @ApiParam({ name: 'clientId', description: 'Client ID' })
    @ApiParam({ name: 'serviceClientId', description: 'Service Client ID' })
    @ApiBody({ type: AccessRightsDto })
    @ApiResponse({ status: 200, description: 'Access rights đã được xóa' })
    async deleteAccessRights(
        @ReqUser() user: User,
        @Param('clientId') clientId: string,
        @Param('serviceClientId') serviceClientId: string,
        @Body() accessRightsDto: AccessRightsDto
    ) {
        return this.clientService.deleteAccessRights(user, clientId, serviceClientId, accessRightsDto);
    }

    @Get(':id/tls-certificates')
    @ApiOperation({ summary: 'Lấy TLS certificates của client' })
    @ApiParam({ name: 'id', description: 'Client ID' })
    @ApiResponse({ status: 200, description: 'Danh sách TLS certificates' })
    async getTLSCertificates(
        @ReqUser() user: User,
        @Param('id') id: string
    ) {
        return this.clientService.getTLSCertificates(user, id);
    }

    @Post(':id/tls-certificates')
    @ApiOperation({ summary: 'Thêm TLS certificate cho client' })
    @ApiParam({ name: 'id', description: 'Client ID' })
    @UseInterceptors(FileInterceptor('file'))
    @ApiResponse({ status: 201, description: 'TLS certificate đã được thêm' })
    async addTLSCertificate(
        @ReqUser() user: User,
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.clientService.addTLSCertificate(user, id, file.buffer);
    }

    @Delete(':id/tls-certificates/:hash')
    @ApiOperation({ summary: 'Xóa TLS certificate theo hash' })
    @ApiParam({ name: 'id', description: 'Client ID' })
    @ApiParam({ name: 'hash', description: 'Certificate hash' })
    @ApiResponse({ status: 200, description: 'TLS certificate đã được xóa' })
    async deleteTLSCertificateByHash(
        @ReqUser() user: User,
        @Param('id') id: string,
        @Param('hash') hash: string
    ) {
        return this.clientService.deleteTLSCertificateByHash(user, id, hash);
    }

    @Get(':id/service-client-candidates')
    @ApiOperation({ summary: 'Lấy service client candidates' })
    @ApiParam({ name: 'id', description: 'Client ID' })
    @ApiQuery({ name: 'member_name_group_description', required: false, type: String })
    @ApiQuery({ name: 'member_group_code', required: false, type: String })
    @ApiQuery({ name: 'subsystem_code', required: false, type: String })
    @ApiQuery({ name: 'instance', required: false, type: String })
    @ApiQuery({ name: 'member_class', required: false, type: String })
    @ApiQuery({ name: 'service_client_type', required: false, type: String })
    @ApiResponse({ status: 200, description: 'Danh sách service client candidates' })
    async getServiceClientCandidates(
        @ReqUser() user: User,
        @Param('id') id: string,
        @Query() queryParams: ServiceClientQueryDto
    ) {
        return this.clientService.getServiceClientCandidates(user, id, queryParams);
    }
}
