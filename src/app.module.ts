import { Module } from '@nestjs/common';
import { ButtonsModule } from './buttons/buttons.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DevicesModule } from './devices/devices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './config/postgres.config';
import { NetworkModule } from './network/network.module';
import { WebsocketsModule } from './websockets/websockets.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRootAsync({imports: [ConfigModule], inject: [ConfigService], useFactory: getPostgresConfig}),
        DevicesModule,
        ButtonsModule,
        NetworkModule,
        WebsocketsModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
