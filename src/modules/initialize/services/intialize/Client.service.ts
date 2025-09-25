import { Injectable, Logger, NotFoundException, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";
import { Configuration } from "@config/configuration";
import { OrganizationService } from "@module/organization/services/organization.services";
import { ServiceDescriptionService } from "../service-description.service";
import { ServiceInitializeService } from "../service-initialize.service";
import { EndpointInitializeService } from "../endpoint-initialize.service";
import { User } from "@module/user/entities/user.entity";
import { Organization } from "@module/organization/entities/organization.entity";
import { ServiceDescriptionInitialize } from "../../entities/service-description.entity";
import { ServiceInitializeEntity } from "../../entities/service-initialize.entity";

// DTOs và Interfaces
export interface ClientQueryParams {
    instance?: string;
    member_class?: string;
    member_code?: string;
    show_members?: boolean;
    exclude_local?: boolean;
    internal_search?: boolean;
}

export interface ServiceClientQueryParams {
    member_name_group_description?: string;
    member_group_code?: string;
    subsystem_code?: string;
    instance?: string;
    member_class?: string;
    service_client_type?: string;
}

export interface CreateClientDto {
    client: {
        member_name: string;
        member_class: string;
        member_code: string;
        subsystem_code?: string;
        connection_type?: string;
    };
    adapter_data: {
        organId: string;
        organName: string;
        organAdd: string;
        email: string;
        telephone: string;
        fax: string;
        website: string;
        description?: string;
        organizationInCharge?: string;
    };
    ignore_warnings?: boolean;
}

export interface UpdateClientDto {
    connection_type: string;
    adapter_data: {
        organName: string;
        organAdd: string;
        email: string;
        telephone: string;
        fax: string;
        website: string;
        organizationInCharge?: string;
    };
}

export interface AddServiceDescriptionDto {
    type: string;
    url: string;
    rest_service_code?: string;
    adapter_data: {
        service_description: {
            description: string;
        };
        service: {
            description: string;
            isPublic: string;
            isForCitizen: string;
            type: string;
        };
    };
}

export interface AccessRightItem {
    service_code: string;
}

export interface AccessRightsDto {
    items: AccessRightItem[];
}

@Injectable()
export class ClientService {
    private readonly logger = new Logger(ClientService.name);
    private readonly ssConfigUrl: string;
    private readonly ssApiKey: string;
    private readonly ssId: string;
    private readonly ssManageId: string;
    private readonly ssManageName: string;

    constructor(
        private readonly configService: ConfigService<Configuration>,
        private readonly httpService: HttpService,
        private readonly organizationService: OrganizationService,
        private readonly serviceDescriptionService: ServiceDescriptionService,
        private readonly serviceInitializeService: ServiceInitializeService,
        private readonly endpointInitializeService: EndpointInitializeService
    ) {
        // Cấu hình từ environment variables
        this.ssConfigUrl = process.env.SS_CONFIG_URL;
        this.ssApiKey = process.env.SS_API_KEY;
        this.ssId = process.env.SS_ID;
        this.ssManageId = process.env.SS_MANAGE_ID;
        this.ssManageName = process.env.SS_MANAGE_NAME;
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
     * Lấy danh sách tất cả clients
     */
    async getAllClients(user: User, queryParams: ClientQueryParams = {}) {
        const url = `${this.ssConfigUrl}/clients`;
        const response = await this.makeRequest('GET', url, null, queryParams);
        
        const clients = response.data as any[];
        const result = [];

        for (const client of clients) {
            const clientId = client.id;
            const organization = await this.findOrganizationBySsId(clientId);
            
            if (organization) {
                client.adapter_data = organization;
                result.push(client);
            } else if (!client.subsystem_code) {
                client.adapter_data = {};
                result.push(client);
            }
        }

        return result;
    }

    /**
     * Lấy client theo ID
     */
    async getClientById(user: User, id: string) {
        const ids = id.split(':');
        
        if (ids.length === 4) {
            const organization = await this.findOrganizationBySsId(id);
            if (!organization) {
                throw new NotFoundException('Không tìm thấy client');
            }
        }

        const url = `${this.ssConfigUrl}/clients/${id}`;
        const response = await this.makeRequest('GET', url);
        
        const client = response.data;
        const organization = await this.findOrganizationBySsId(id);
        
        if (organization) {
            client.adapter_data = organization;
        } else if (!client.subsystem_code) {
            client.adapter_data = {};
        }

        return client;
    }

    /**
     * Xóa client theo ID
     */
    async deleteClientById(user: User, id: string) {
        await this.validateClientExists(id);
        
        const url = `${this.ssConfigUrl}/clients/${id}`;
        const response = await this.makeRequest('DELETE', url);
        
        return response.data;
    }

    /**
     * Tạo client mới
     */
    async createClient(user: User, createDto: CreateClientDto) {
        if (!createDto.client || !createDto.adapter_data) {
            throw new BadRequestException('Thiếu thông tin client hoặc adapter_data');
        }

        const { client, adapter_data, ignore_warnings } = createDto;
        
        if (!client.member_name || !client.member_class || !client.member_code) {
            throw new BadRequestException('Thiếu thông tin bắt buộc của client');
        }

        const requestBody = {
            ignore_warnings: ignore_warnings || false,
            client: {
                member_name: client.member_name,
                member_class: client.member_class,
                member_code: client.member_code,
                subsystem_code: client.subsystem_code,
                connection_type: client.connection_type
            }
        };

        const url = `${this.ssConfigUrl}/clients`;
        const response = await this.makeRequest('POST', url, requestBody);
        
        if (response.status >= 200 && response.status < 300) {
            const responseData = response.data;
            const ssId = responseData.id;
            
            // Tạo Organization mới
            const organization = await this.createOrganization(ssId, adapter_data);
            responseData.adapter_data = organization;
            
            return responseData;
        } else {
            throw new Error(response.data);
        }
    }

    /**
     * Cập nhật client theo ID
     */
    async updateClientById(user: User, id: string, updateDto: UpdateClientDto) {
        await this.validateClientExists(id);
        
        if (!updateDto.connection_type || !updateDto.adapter_data) {
            throw new BadRequestException('Thiếu thông tin connection_type hoặc adapter_data');
        }

        const { adapter_data } = updateDto;
        const requiredFields = ['organName', 'organAdd', 'email', 'telephone', 'fax', 'website'];
        
        for (const field of requiredFields) {
            if (!adapter_data[field]) {
                throw new BadRequestException(`Thiếu thông tin: ${field}`);
            }
        }

        const requestBody = {
            connection_type: updateDto.connection_type
        };

        const url = `${this.ssConfigUrl}/clients/${id}`;
        await this.makeRequest('PATCH', url, requestBody);
        
        // Cập nhật Organization
        await this.updateOrganization(id, adapter_data);
        
        return { success: true };
    }

    /**
     * Đăng ký client
     */
    async registerClient(user: User, id: string) {
        await this.validateClientExists(id);
        
        const url = `${this.ssConfigUrl}/clients/${id}/register`;
        await this.makeRequest('PUT', url);
        
        return { success: true };
    }

    /**
     * Hủy đăng ký client
     */
    async unregisterClient(user: User, id: string) {
        await this.validateClientExists(id);
        
        const url = `${this.ssConfigUrl}/clients/${id}/unregister`;
        const response = await this.makeRequest('PUT', url);
        
        return response.data;
    }

    /**
     * Lấy service clients của client
     */
    async getServiceClients(user: User, id: string) {
        await this.validateClientExists(id);
        
        const url = `${this.ssConfigUrl}/clients/${id}/service-clients`;
        const response = await this.makeRequest('GET', url);
        
        const clients = response.data as any[];
        const result = [];

        for (const client of clients) {
            const clientId = client.id;
            const organization = await this.findOrganizationBySsId(clientId);
            
            if (organization) {
                client.adapter_data = organization;
                result.push(client);
            } else if (client.service_client_type !== 'SUBSYSTEM') {
                client.adapter_data = {};
                result.push(client);
            }
        }

        return result;
    }

    /**
     * Lấy service client theo ID
     */
    async getServiceClientById(user: User, clientId: string, serviceClientId: string) {
        await this.validateClientExists(clientId);
        
        const serviceClientOrg = await this.findOrganizationBySsId(serviceClientId);
        if (!serviceClientOrg) {
            throw new NotFoundException('Không tìm thấy service client');
        }

        const url = `${this.ssConfigUrl}/clients/${clientId}/service-clients/${serviceClientId}`;
        const response = await this.makeRequest('GET', url);
        
        const serviceClient = response.data;
        const organization = await this.findOrganizationBySsId(serviceClientId);
        
        if (organization) {
            serviceClient.adapter_data = organization;
        } else if (serviceClient.service_client_type !== 'SUBSYSTEM') {
            serviceClient.adapter_data = {};
        }

        return serviceClient;
    }

    /**
     * Lấy access rights của service client
     */
    async getAccessRights(user: User, clientId: string, serviceClientId: string) {
        await this.validateClientExists(clientId);
        
        const serviceClientOrg = await this.findOrganizationBySsId(serviceClientId);
        if (!serviceClientOrg) {
            throw new NotFoundException('Không tìm thấy service client');
        }

        const url = `${this.ssConfigUrl}/clients/${clientId}/service-clients/${serviceClientId}/access-rights`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Thêm access rights cho service client
     */
    async addAccessRights(user: User, clientId: string, serviceClientId: string, accessRightsDto: AccessRightsDto) {
        await this.validateClientExists(clientId);
        
        const serviceClientOrg = await this.findOrganizationBySsId(serviceClientId);
        if (!serviceClientOrg) {
            throw new NotFoundException('Không tìm thấy service client');
        }

        if (!accessRightsDto.items || !Array.isArray(accessRightsDto.items)) {
            throw new BadRequestException('Thiếu thông tin items');
        }

        const requestBody = {
            items: accessRightsDto.items.map(item => ({
                service_code: item.service_code
            }))
        };

        const url = `${this.ssConfigUrl}/clients/${clientId}/service-clients/${serviceClientId}/access-rights`;
        const response = await this.makeRequest('POST', url, requestBody);
        
        return response.data;
    }

    /**
     * Xóa access rights của service client
     */
    async deleteAccessRights(user: User, clientId: string, serviceClientId: string, accessRightsDto: AccessRightsDto) {
        await this.validateClientExists(clientId);
        
        const serviceClientOrg = await this.findOrganizationBySsId(serviceClientId);
        if (!serviceClientOrg) {
            throw new NotFoundException('Không tìm thấy service client');
        }

        if (!accessRightsDto.items || !Array.isArray(accessRightsDto.items)) {
            throw new BadRequestException('Thiếu thông tin items');
        }

        const requestBody = {
            items: accessRightsDto.items.map(item => ({
                service_code: item.service_code
            }))
        };

        const url = `${this.ssConfigUrl}/clients/${clientId}/service-clients/${serviceClientId}/access-rights/delete`;
        const response = await this.makeRequest('POST', url, requestBody);
        
        return response.data;
    }

    /**
     * Lấy TLS certificates của client
     */
    async getTLSCertificates(user: User, id: string) {
        await this.validateClientExists(id);
        
        const url = `${this.ssConfigUrl}/clients/${id}/tls-certificates`;
        const response = await this.makeRequest('GET', url);
        
        return response.data;
    }

    /**
     * Thêm TLS certificate cho client
     */
    async addTLSCertificate(user: User, id: string, file: Buffer) {
        await this.validateClientExists(id);
        
        const url = `${this.ssConfigUrl}/clients/${id}/tls-certificates`;
        const headers = this.getHeaders('application/octet-stream');
        
        const response = await this.makeRequest('POST', url, file, null, headers);
        
        return response.data;
    }

    /**
     * Xóa TLS certificate theo hash
     */
    async deleteTLSCertificateByHash(user: User, id: string, hash: string) {
        await this.validateClientExists(id);
        
        const url = `${this.ssConfigUrl}/clients/${id}/tls-certificates/${hash}`;
        const response = await this.makeRequest('DELETE', url);
        
        return response.data;
    }

    /**
     * Lấy service client candidates
     */
    async getServiceClientCandidates(user: User, id: string, queryParams: ServiceClientQueryParams = {}) {
        await this.validateClientExists(id);
        
        const url = `${this.ssConfigUrl}/clients/${id}/service-client-candidates`;
        const response = await this.makeRequest('GET', url, null, queryParams);
        
        const clients = response.data as any[];
        const result = [];

        for (const client of clients) {
            const clientId = client.id;
            const organization = await this.findOrganizationBySsId(clientId);
            
            if (organization) {
                client.adapter_data = organization;
                result.push(client);
            } else if (client.service_client_type !== 'SUBSYSTEM') {
                client.adapter_data = {};
                result.push(client);
            }
        }

        return result;
    }

    // Helper methods
    private async findOrganizationBySsId(ssId: string): Promise<Organization | null> {
        try {
            const organizations = await this.organizationService.getMany(null, { ssId });
            return organizations.length > 0 ? organizations[0] : null;
        } catch (error) {
            this.logger.error(`Error finding organization by ssId ${ssId}:`, error);
            return null;
        }
    }

    private async validateClientExists(id: string) {
        const ids = id.split(':');
        
        if (ids.length === 4) {
            const organization = await this.findOrganizationBySsId(id);
            if (!organization) {
                throw new NotFoundException('Không tìm thấy client');
            }
        }
    }

    private async createOrganization(ssId: string, adapterData: any): Promise<Organization> {
        const organization: Partial<Organization> = {
            organId: adapterData.organId,
            ssId: ssId,
            organizationInCharge: adapterData.organizationInCharge,
            organName: adapterData.organName,
            organAdd: adapterData.organAdd,
            email: adapterData.email,
            telephone: adapterData.telephone,
            fax: adapterData.fax,
            website: adapterData.website,
            description: adapterData.description,
            status: 'ALLOWED'
        };

        return await this.organizationService.create(null, organization);
    }

    private async updateOrganization(ssId: string, adapterData: any) {
        const organization = await this.findOrganizationBySsId(ssId);
        if (organization) {
            const updateData: Partial<Organization> = {
                organName: adapterData.organName,
                organAdd: adapterData.organAdd,
                email: adapterData.email,
                telephone: adapterData.telephone,
                fax: adapterData.fax,
                website: adapterData.website
            };

            if (adapterData.organizationInCharge) {
                updateData.organizationInCharge = adapterData.organizationInCharge;
            }

            await this.organizationService.updateById(null, organization._id, updateData);
        }
    }
}
