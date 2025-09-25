import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";
import { Configuration } from "@config/configuration";
import { OrganizationService } from "@module/organization/services/organization.services";
import { ServiceDescriptionService } from "../service-description.service";
import { ServiceInitializeService } from "../service-initialize.service";
import { User } from "@module/user/entities/user.entity";
import { Organization } from "@module/organization/entities/organization.entity";
import { ServiceDescriptionInitialize } from "../../entities/service-description.entity";
import { ServiceInitializeEntity } from "../../entities/service-initialize.entity";
import * as fs from 'fs';
import * as path from 'path';

// DTOs và Interfaces
export interface InitializeDto {
    owner_member_class: string;
    owner_member_code: string;
    security_server_code: string;
    software_token_pin: string;
    ignore_warnings: boolean;
}

export interface PostInitializeDto {
    adapter_data: {
        organId: string;
        organName: string;
        organAdd: string;
        email: string;
        telephone: string;
        fax?: string;
        website?: string;
        description?: string;
        host: string;
    };
}

export interface SecurityServerInfo {
    id: string;
    member_class: string;
    member_code: string;
    server_code: string;
}

export interface MemberNameInfo {
    member_name: string;
}

@Injectable()
export class InitializationService {
    private readonly logger = new Logger(InitializationService.name);
    private readonly ssConfigUrl: string;
    private readonly ssApiKey: string;
    private readonly ssManageId: string;
    private readonly ssManageName: string;
    private readonly ssManageSubsystemId: string;
    private readonly ssManageServiceCode: string;
    private readonly ssMessageServiceCode: string;

    constructor(
        private readonly configService: ConfigService<Configuration>,
        private readonly httpService: HttpService,
        private readonly organizationService: OrganizationService,
        private readonly serviceDescriptionService: ServiceDescriptionService,
        private readonly serviceInitializeService: ServiceInitializeService
    ) {
        // Cấu hình từ environment variables
        this.ssConfigUrl = process.env.SS_CONFIG_URL;
        this.ssApiKey = process.env.SS_API_KEY;
        this.ssManageId = process.env.SS_MANAGE_ID;
        this.ssManageName = process.env.SS_MANAGE_NAME;
        this.ssManageSubsystemId = process.env.SS_MANAGE_SUBSYSTEM_ID;
        this.ssManageServiceCode = process.env.SS_MANAGE_SERVICE_CODE;
        this.ssMessageServiceCode = process.env.SS_MESSAGE_SERVICE_CODE;
    }

    private getHeaders(contentType: string = 'application/json') {
        return {
            'Authorization': `X-Road-ApiKey token=${this.ssApiKey}`,
            'Content-Type': contentType,
            'Accept': 'application/json'
        };
    }

    private async makeRequest<T = any>(
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        url: string,
        data?: any,
        params?: any,
        headers?: any
    ): Promise<AxiosResponse<T>> {
        try {
            const config = {
                method,
                url,
                headers: headers || this.getHeaders(),
                ...(data && { data }),
                ...(params && { params })
            };

            this.logger.log(`Making ${method} request to: ${url}`);
            return await lastValueFrom(this.httpService.request<T>(config));
        } catch (error) {
            this.logger.error(`Request failed: ${error.message}`, error.stack);
            throw error;
        }
    }

    /**
     * Lấy trạng thái khởi tạo của Security Server
     */
    async getInitializationStatus(user: User) {
        const url = `${this.ssConfigUrl}/initialization/status`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Khởi tạo Security Server
     */
    async initialize(user: User, initializeDto: InitializeDto) {
        if (!initializeDto.owner_member_class || 
            !initializeDto.owner_member_code || 
            !initializeDto.security_server_code || 
            !initializeDto.software_token_pin) {
            throw new BadRequestException('Thiếu thông tin bắt buộc để khởi tạo');
        }

        const requestBody = {
            owner_member_class: initializeDto.owner_member_class,
            owner_member_code: initializeDto.owner_member_code,
            security_server_code: initializeDto.security_server_code,
            software_token_pin: initializeDto.software_token_pin,
            ignore_warnings: initializeDto.ignore_warnings || false
        };

        const url = `${this.ssConfigUrl}/initialization`;
        const response = await this.makeRequest('POST', url, requestBody);
        
        return response.data;
    }

    /**
     * Thực hiện post-initialization setup
     */
    async postInitialize(user: User, postInitDto: PostInitializeDto) {
        if (!postInitDto.adapter_data) {
            throw new BadRequestException('Thiếu thông tin adapter_data');
        }

        const { adapter_data } = postInitDto;
        const requiredFields = ['organId', 'organName', 'organAdd', 'email', 'telephone', 'host'];
        
        for (const field of requiredFields) {
            if (!adapter_data[field]) {
                throw new BadRequestException(`Thiếu thông tin: ${field}`);
            }
        }

        try {
            // Step 1: Lấy thông tin security server hiện tại
            const serverInfo = await this.getCurrentSecurityServer();
            this.logger.log(`Current security server: ${JSON.stringify(serverInfo)}`);

            // Step 2: Lấy member name
            const memberName = await this.getMemberName(serverInfo.member_class, serverInfo.member_code);
            this.logger.log(`Member name: ${memberName.member_name}`);

            // Step 3: Tạo client cho management subsystem
            const clientInfo = await this.createManagementClient(serverInfo, memberName);
            this.logger.log(`Created client: ${clientInfo.id}`);

            // Lưu SS_ID vào file properties (tương tự Java)
            await this.saveSSIdToFile(clientInfo.id);

            // Step 4: Tạo Organization
            const organization = await this.createOrganization(clientInfo.id, adapter_data);
            this.logger.log(`Created organization: ${organization._id}`);

            // Step 5: Tạo management service description và service
            const managementServiceDesc = await this.createManagementServiceDescription(
                clientInfo.id, 
                adapter_data, 
                organization
            );

            // Step 6: Tạo message service description và service
            const messageServiceDesc = await this.createMessageServiceDescription(
                clientInfo.id, 
                adapter_data, 
                organization
            );

            return {
                success: true,
                ssId: clientInfo.id,
                organization: organization,
                managementService: managementServiceDesc,
                messageService: messageServiceDesc
            };

        } catch (error) {
            this.logger.error(`Post initialization failed: ${error.message}`, error.stack);
            throw error;
        }
    }

    /**
     * Lấy thông tin security server hiện tại
     */
    private async getCurrentSecurityServer(): Promise<SecurityServerInfo> {
        const url = `${this.ssConfigUrl}/security-servers`;
        const params = { current_server: true };
        
        const response = await this.makeRequest('GET', url, null, params);
        const servers = response.data as SecurityServerInfo[];
        
        if (!servers || servers.length === 0) {
            throw new Error('Không tìm thấy security server hiện tại');
        }

        return servers[0];
    }

    /**
     * Lấy member name
     */
    private async getMemberName(memberClass: string, memberCode: string): Promise<MemberNameInfo> {
        const url = `${this.ssConfigUrl}/member-names`;
        const params = {
            member_class: memberClass,
            member_code: memberCode
        };
        
        const response = await this.makeRequest('GET', url, null, params);
        return response.data as MemberNameInfo;
    }

    /**
     * Tạo management client
     */
    private async createManagementClient(serverInfo: SecurityServerInfo, memberName: MemberNameInfo) {
        const requestBody = {
            ignore_warnings: false,
            client: {
                member_name: memberName.member_name,
                member_class: serverInfo.member_class,
                member_code: serverInfo.member_code,
                subsystem_code: this.ssManageSubsystemId,
                connection_type: 'HTTP'
            }
        };

        const url = `${this.ssConfigUrl}/clients`;
        const response = await this.makeRequest('POST', url, requestBody);
        
        return response.data;
    }

    /**
     * Lưu SS_ID vào file properties
     */
    private async saveSSIdToFile(ssId: string): Promise<void> {
        try {
            const filePath = path.join(process.cwd(), 'ssid.properties');
            const content = `SS_ID=${ssId}\n`;
            
            await fs.promises.writeFile(filePath, content, 'utf8');
            
            // Cập nhật biến môi trường runtime
            process.env.SS_ID = ssId;
            
            this.logger.log(`Saved SS_ID to file: ${filePath}`);
        } catch (error) {
            this.logger.error(`Failed to save SS_ID to file: ${error.message}`);
            throw error;
        }
    }

    /**
     * Tạo Organization
     */
    private async createOrganization(ssId: string, adapterData: any): Promise<Organization> {
        const organization: Partial<Organization> = {
            organId: adapterData.organId,
            ssId: ssId,
            organName: adapterData.organName,
            organAdd: adapterData.organAdd,
            email: adapterData.email,
            telephone: adapterData.telephone,
            fax: adapterData.fax,
            website: adapterData.website,
            description: adapterData.description,
            status: 'MANAGEMENT'
        };

        return await this.organizationService.create(null, organization);
    }

    /**
     * Tạo management service description và service
     */
    private async createManagementServiceDescription(
        ssId: string, 
        adapterData: any, 
        organization: Organization
    ) {
        // Tạo service description trên Security Server
        const serviceDescRequestBody = {
            rest_service_code: this.ssManageServiceCode,
            type: 'REST',
            url: `${adapterData.host}/api/lienthong/v1`
        };

        const serviceDescUrl = `${this.ssConfigUrl}/clients/${ssId}/service-descriptions`;
        const serviceDescResponse = await this.makeRequest('POST', serviceDescUrl, serviceDescRequestBody);
        const serviceDescData = serviceDescResponse.data;

        // Tạo Service entity
        const service = await this.createService({
            ssId: `${ssId}:${this.ssManageServiceCode}`,
            description: adapterData.description || 'Management service',
            isPublic: false,
            isForCitizen: false,
            type: 'REST',
            status: 'MANAGEMENT'
        });

        // Tạo ServiceDescription entity
        const serviceDescription = await this.createServiceDescription({
            ssId: serviceDescData.id,
            description: 'Service được sử dụng để Central Service đồng bộ thông tin từ các Security Server',
            organization: organization,
            services: [service]
        });

        // Thêm service clients
        await this.addServiceClients(service._ssId);

        // Enable service description
        await this.enableServiceDescription(serviceDescription._ssId);

        return serviceDescription;
    }

    /**
     * Tạo message service description và service
     */
    private async createMessageServiceDescription(
        ssId: string, 
        adapterData: any, 
        organization: Organization
    ) {
        // Tạo service description trên Security Server
        const serviceDescRequestBody = {
            rest_service_code: this.ssMessageServiceCode,
            type: 'REST',
            url: `${adapterData.host}/api/lienthong/v1/messages`
        };

        const serviceDescUrl = `${this.ssConfigUrl}/clients/${ssId}/service-descriptions`;
        const serviceDescResponse = await this.makeRequest('POST', serviceDescUrl, serviceDescRequestBody);
        const serviceDescData = serviceDescResponse.data;

        // Tạo Service entity
        const service = await this.createService({
            ssId: `${ssId}:${this.ssManageServiceCode}`, // Note: Java code có vẻ sai, nên để tạm như này
            description: adapterData.description || 'Message service',
            isPublic: true,
            isForCitizen: false,
            type: 'REST',
            status: 'MANAGEMENT'
        });

        // Tạo ServiceDescription entity
        const serviceDescription = await this.createServiceDescription({
            ssId: serviceDescData.id,
            description: 'Service được sử dụng để gửi tin giữa các Security Server',
            organization: organization,
            services: [service]
        });

        // Thêm service clients
        await this.addServiceClients(service._ssId);

        // Enable service description
        await this.enableServiceDescription(serviceDescription._ssId);

        return serviceDescription;
    }

    /**
     * Tạo Service entity
     */
    private async createService(serviceData: {
        ssId: string;
        description: string;
        isPublic: boolean;
        isForCitizen: boolean;
        type: string;
        status: string;
    }): Promise<ServiceInitializeEntity> {
        const service: Partial<ServiceInitializeEntity> = {
            _ssId: serviceData.ssId,
            _isPublic: serviceData.isPublic,
            _isForCitizen: serviceData.isForCitizen,
            _type: serviceData.type,
            _status: serviceData.status,
            _endpoints: []
        };

        return await this.serviceInitializeService.create(null, service);
    }

    /**
     * Tạo ServiceDescription entity
     */
    private async createServiceDescription(serviceDescData: {
        ssId: string;
        description: string;
        organization: Organization;
        services: ServiceInitializeEntity[];
    }): Promise<ServiceDescriptionInitialize> {
        const serviceDescription: Partial<ServiceDescriptionInitialize> = {
            _ssId: serviceDescData.ssId,
            _description: serviceDescData.description,
            _organizations: serviceDescData.organization,
            _services: serviceDescData.services
        };

        return await this.serviceDescriptionService.create(null, serviceDescription);
    }

    /**
     * Thêm service clients cho service
     */
    private async addServiceClients(serviceId: string): Promise<void> {
        const requestBody = {
            items: [
                {
                    id: this.ssManageId,
                    name: this.ssManageName,
                    service_client_type: 'SUBSYSTEM'
                }
            ]
        };

        try {
            const url = `${this.ssConfigUrl}/services/${serviceId}/service-clients`;
            await this.makeRequest('POST', url, requestBody);
            this.logger.log(`Added service clients for service: ${serviceId}`);
        } catch (error) {
            this.logger.warn(`Failed to add service clients for service ${serviceId}:`, error.message);
        }
    }

    /**
     * Enable service description
     */
    private async enableServiceDescription(serviceDescriptionId: string): Promise<void> {
        try {
            const url = `${this.ssConfigUrl}/service-descriptions/${serviceDescriptionId}/enable`;
            await this.makeRequest('PUT', url);
            this.logger.log(`Enabled service description: ${serviceDescriptionId}`);
        } catch (error) {
            this.logger.warn(`Failed to enable service description ${serviceDescriptionId}:`, error.message);
        }
    }
}
