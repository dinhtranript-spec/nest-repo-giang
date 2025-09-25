import { DefaultModules, DefaultProviders } from "@config/module/config";
import { AuditLogModule } from "@module/audit-log/audit-log.module";
import { IncrementModule } from "@module/increment/increment.module";
import { RedisModule } from "@module/redis/redis.module";
import { SsoModule } from "@module/sso/sso.module"; 
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { CommonProviderModule } from "./modules/common-provider/common-provider.module";
import { DataPartitionModule } from "./modules/data-partition/data-partition.module";
import { DataProcessModule } from "./modules/data-process/data-process.module";
import { FileModule } from "./modules/file/file.module";
import { ImportSessionModule } from "./modules/import-session/import-session.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { OneSignalModule } from "./modules/one-signal/one-signal.module";
import { QuyTacMaModule } from "./modules/quy-tac-ma/quy-tac-ma.module";
import { SettingModule } from "./modules/setting/setting.module";
import { TopicModule } from "./modules/topic/topic.module";
import { UserModule } from "./modules/user/user.module";
import { MessageModule } from "./modules/message/message.module";
import { NotificationSecurityAdapterModule } from "./modules/notification-security-adapter/notification-security-adapter.module";
import { OrganizationModule } from "./modules/organization/organization.module";
import { InitializeModule } from "./modules/initialize/initialize.module";
import { BacLuongModule } from "./modules/bac-luong/bac-luong.module";
import { CongDoanModule } from "./modules/cong-doan/cong-doan.module";
import { DuAnModule } from "./modules/du-an/du-an.module";
import { NhanVienModule } from "./modules/nhan-vien/nhan-vien.module";
import { KetQuaModule } from "./modules/ket-qua/ket-qua.module";
import { CongDoanNhanVienModule } from "./modules/cong-doan-nhan-vien/cong-doan-nhan-vien.module";
import { CongViecModule } from "./modules/cong-viec/cong-viec.module";
import { CongViecNhanVienModule } from "./modules/cong-viec-nhan-vien/cong-viec-nhan-vien.module";
import { LoaiDuAnModule } from "./modules/loai-du-an/loai-du-an.module";
import { PhongBanModule } from "./modules/phong-ban/phong-ban.module";
import { LuongModule } from "./modules/luong/luong.module";
import { PhongBanNhanVienModule } from "./modules/phong-ban-nhan-vien/phong-ban-nhan-vien.module";
import { ViTriModule } from "./modules/vi-tri/vi-tri.module"; 
@Module({
    imports: [
        ...DefaultModules,
        AuthModule,
        UserModule,
        OneSignalModule,
        NotificationModule,
        TopicModule,
        FileModule,
        SettingModule,
        RedisModule,
        SsoModule,
        IncrementModule,
        ImportSessionModule,
        QuyTacMaModule,
        AuditLogModule,
        DataProcessModule,
        DataPartitionModule,    
        CommonProviderModule,
        MessageModule,
        NotificationSecurityAdapterModule,
        OrganizationModule,
        InitializeModule,
        BacLuongModule,
        CongDoanModule,
        DuAnModule,
        NhanVienModule,
        KetQuaModule,
        CongDoanNhanVienModule,
        CongViecModule,
        CongViecNhanVienModule,
        LoaiDuAnModule,
        PhongBanModule,
        LuongModule,
        PhongBanNhanVienModule,
        ViTriModule,
    ],
    providers: [...DefaultProviders],
    controllers: [AppController],
})
export class AppModule {}
