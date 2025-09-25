import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { execSync } from "child_process";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { firstValueFrom } from "rxjs";
import FormData from 'form-data';

@Injectable()
export class BackUpService {
    private readonly apiUrl: string;
    private readonly apiKey: string;
    
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {
        this.apiUrl = this.configService.get<string>('ssh.apiUrl');
        this.apiKey = this.configService.get<string>('ss.apiKey');
    }
    
    private get headers() {
        return {
            Authorization: `X-Road-ApiKey token=${this.apiKey}`,
        }
    }
    
    async getAll(): Promise<AxiosResponse> {
        try {
            return await firstValueFrom(
                this.httpService.get(`${this.apiUrl}/backups`, {
                    headers: { ...this.headers, Accept: 'application/json' }
                })
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
    async create(): Promise<AxiosResponse> {
        try {
            return await firstValueFrom(
                this.httpService.post(`${this.apiUrl}/backups`, null, {
                    headers: { 
                        ...this.headers, 
                        'Content-Type': 'application/json',
                        Accept: 'application/json' 
                    }
                })
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
    async createExt(): Promise<AxiosResponse> {
        try {
            return await firstValueFrom(
                this.httpService.post(`${this.apiUrl}/backups/ext`, null, {
                    headers: { 
                        ...this.headers, 
                        'Content-Type': 'application/json',
                        Accept: 'application/json' 
                    }
                })
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
    async upload(file: Express.Multer.File): Promise<AxiosResponse> {
        try {
            const formData = new FormData();
            formData.append('file', file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype
            });
            
            return await firstValueFrom(
                this.httpService.post(`${this.apiUrl}/backups/upload`, formData, {
                    headers: { 
                        ...this.headers,
                        ...formData.getHeaders()
                    }
                })
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
    async deleteByFilename(filename: string): Promise<AxiosResponse> {
        try {
            return await firstValueFrom(
                this.httpService.delete(`${this.apiUrl}/backups/${filename}`, {
                    headers: { 
                        ...this.headers, 
                        'Content-Type': 'application/json',
                        Accept: 'application/json' 
                    }
                })
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
    async restoreByFilename(filename: string): Promise<AxiosResponse> {
        try {
            return await firstValueFrom(
                this.httpService.put(`${this.apiUrl}/backups/${filename}/restore`, null, {
                    headers: { 
                        ...this.headers, 
                        'Content-Type': 'application/json',
                        Accept: 'application/json' 
                    }
                })
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
    async downloadByFilename(filename: string): Promise<AxiosResponse> {
        try {
            return await firstValueFrom(
                this.httpService.get(`${this.apiUrl}/backups/${filename}/download`, {
                    headers: { 
                        ...this.headers, 
                        'Content-Type': 'application/json',
                        Accept: 'application/octet-stream' 
                    },
                    responseType: 'stream'
                })
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}