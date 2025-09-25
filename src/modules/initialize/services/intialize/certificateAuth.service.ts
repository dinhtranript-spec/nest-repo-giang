import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { execSync } from "child_process";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { firstValueFrom } from "rxjs";
import FormData from 'form-data';

@Injectable()
export class CertificateAuthService {
    private readonly ssConfigUrl: string;
    private readonly ssConfigApiKey: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {
        this.ssConfigUrl = this.configService.get<string>('ssConfig.url');
        this.ssConfigApiKey = this.configService.get<string>('ssConfig.apiKey');
    }

    private get headers() {
        return {
            Authorization: `X-Road-ApiKey token=${this.ssConfigApiKey}`,
        }
    }
    async getAll(){
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.ssConfigUrl}/certificate-authorities`, {
                    headers: this.headers,
                })
            );
            return response.data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getCRSubjectFieldsByCAName(
        caName: string, 
        keyUsageType: string, 
        memberId?: string, 
        isNemMember?: boolean,
    ){
        try {
            const caNameUrl = caName.replace(/ /g, '%20'); 
            const url = `$this.ssConfigUrl/certificate-authorities/${caNameUrl}/csr-subject-fields`
            const params: any=  {
                key_usage_type: keyUsageType,
            };
            if (keyUsageType === 'SIGNING'){
                if(memberId) params.member_id = memberId; 
            }
            if (isNemMember){
                params.is_nem_member= isNemMember;
            }
            const response: AxiosResponse = await firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        ...this.headers,
                        'Content-Type': 'application/json',
                    },
                    params,
                })
            );
            return response.data;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    
}