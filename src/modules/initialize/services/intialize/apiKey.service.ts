import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { execSync } from "child_process";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiKeyService {
    private readonly sshUser: string;
    private readonly sshPassword: string;
    private readonly containerName: string;
    private readonly apiUrl: string;

    constructor(private readonly configService: ConfigService) {
        this.sshUser = this.configService.get<string>('ssh.user');
        this.sshPassword = this.configService.get<string>('ssh.password');
        this.containerName = this.configService.get<string>('ssh.containerName');
        this.apiUrl = this.configService.get<string>('ssh.apiUrl');
    }

    private runCommand(command: string): string {
        try {
            return execSync(command, { encoding: "utf-8" });
        } catch (error) {
            throw new InternalServerErrorException("Error running command: " + error.message);
        }
    }

    async getAll() {
        const cmd = `sshpass -p ${this.sshPassword} ssh -o StrictHostKeyChecking=no ${this.sshUser}@${this.containerName} "curl -X GET -u ${this.sshUser}:${this.sshPassword} ${this.apiUrl} -k"`;
        const output = this.runCommand(cmd);
        const response = JSON.parse(output);
        return response.data;
    }

    async create(apiKeyDto: any) {
        if (!apiKeyDto.roles) {
            throw new InternalServerErrorException("Thiếu thông tin roles");
        }

        const body = JSON.stringify(apiKeyDto).replace(/"/g, '\\"');
        const cmd = `sshpass -p ${this.sshPassword} ssh -o StrictHostKeyChecking=no ${this.sshUser}@${this.containerName} "curl -X POST -u ${this.sshUser}:${this.sshPassword} ${this.apiUrl} -k -d '${body}'"`;
        const output = this.runCommand(cmd);
        const response = JSON.parse(output);
        return response.data;
    }

    async getById(apiKeyId: string) {
        const cmd = `sshpass -p ${this.sshPassword} ssh -o StrictHostKeyChecking=no ${this.sshUser}@${this.containerName} "curl -X GET -u ${this.sshUser}:${this.sshPassword} ${this.apiUrl}/${apiKeyId} -k"`;
        const output = this.runCommand(cmd);
        const response = JSON.parse(output);
        return response.data;
    }

    async update(apiKeyId: string, apiKeyDto: any) {
        if (!apiKeyDto.roles) {
            throw new InternalServerErrorException("Thiếu thông tin roles");
        }

        const body = JSON.stringify(apiKeyDto).replace(/"/g, '\\"');
        const cmd = `sshpass -p ${this.sshPassword} ssh -o StrictHostKeyChecking=no ${this.sshUser}@${this.containerName} "curl -X PUT -u ${this.sshUser}:${this.sshPassword} ${this.apiUrl}/${apiKeyId} -k -d '${body}'"`;
        const output = this.runCommand(cmd);
        const response = JSON.parse(output);
        return response.data;
    }

    async delete(apiKeyId: string) {
        const cmd = `sshpass -p ${this.sshPassword} ssh -o StrictHostKeyChecking=no ${this.sshUser}@${this.containerName} "curl -X DELETE -u ${this.sshUser}:${this.sshPassword} ${this.apiUrl}/${apiKeyId} -k"`;
        const output = this.runCommand(cmd);
        const response = JSON.parse(output);
        return response.data;
    }
}