import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// Controllers
import { ClientInitializeController } from './controller/client-initialize.controller';
import { InitializationController } from './controller/initialization.controller';
import { KeyController } from './controller/key.controller';
import { MemberClassController } from './controller/member-class.controller';
import { MemberNameController } from './controller/member-name.controller';
import { NotificationController } from './controller/notification.controller';
import { SystemController } from './controller/system.controller';
import { TimestampingController } from './controller/timestamping.controller';
import { TokenController } from './controller/token.controller';
import { TokenCertificateController } from './controller/token-certificate.controller';
import { XroadInstanceController } from './controller/xroad-instance.controller';

// Services
import { ClientService } from './services/intialize/Client.service';
import { InitializationService } from './services/intialize/initialization.service';
import { KeyService } from './services/intialize/key.service';
import { MemberClassService } from './services/intialize/memberclass.service';
import { MemberNameService } from './services/intialize/memberName.serice';
import { NotificationService } from './services/intialize/notification.service';
import { SystemService } from './services/intialize/system.service';
import { TimestampingService } from './services/intialize/timeStampingService.service';
import { TokenService } from './services/intialize/token.service';
import { TokenCertificateService } from './services/intialize/tokenCertificate.service';
import { XroadInstanceService } from './services/intialize/xroadInstance.service';
import { ServiceDescriptionService } from './services/service-description.service';
import { ServiceInitializeService } from './services/service-initialize.service';
import { EndpointInitializeService } from './services/endpoint-initialize.service';
import { RepositoryProvider } from "@module/repository/common/repository";
import { Entity } from "@module/repository";

// Repository implementations
import { ServiceDescriptionRepositorySql } from './repository/service-description-repository.sql';
import { ServiceRepositorySql } from './repository/service-repository.sql';
import { EndpointInitializeRepositorySql } from './repository/endpoint-initialize-repository.sql';

// Models
import { ServiceDescriptionModel } from './models/service-description.module';
import { ServiceInitializeModel } from './models/service-initialize.module';
import { EndpointInitializeModel } from './models/endpoint-initialize.module.interface';
// Other modules
import { OrganizationModule } from '@module/organization/organization.module';
import { RepositoryModule } from '@module/repository/repository.module';

@Module({
    providers: [
        // Repository providers
        RepositoryProvider(Entity.SERVICE_DESCRIPTION_INITIALIZE, ServiceDescriptionRepositorySql),
        RepositoryProvider(Entity.SERVICE_INITIALIZE, ServiceRepositorySql),
        RepositoryProvider(Entity.ENDPOINT_INITIALIZE, EndpointInitializeRepositorySql),
        
        // Services
        ServiceDescriptionService,
        ClientService,
        InitializationService,
        KeyService,
        MemberClassService,
        MemberNameService,
        NotificationService,
        SystemService,
        TimestampingService,
        TokenService,
        TokenCertificateService,
        XroadInstanceService,
        ServiceInitializeService,
        EndpointInitializeService
    ],
    imports: [
        HttpModule,
        ConfigModule,
        OrganizationModule,
        RepositoryModule,
        SequelizeModule.forFeature([
            ServiceDescriptionModel,
            ServiceInitializeModel,
            EndpointInitializeModel
        ])
    ],
    controllers: [
        ClientInitializeController,
        InitializationController,
        KeyController,
        MemberClassController,
        MemberNameController,
        NotificationController,
        SystemController,
        TimestampingController,
        TokenController,
        TokenCertificateController,
        XroadInstanceController
    ],
    exports: [
        ServiceDescriptionService,
        ClientService,
        InitializationService,
        KeyService,
        MemberClassService,
        MemberNameService,
        NotificationService,
        SystemService,
        TimestampingService,
        TokenService,
        TokenCertificateService,
        XroadInstanceService,
        ServiceInitializeService,
        EndpointInitializeService
    ]
})
export class InitializeModule {}

