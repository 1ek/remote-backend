import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions} from "@nestjs/sequelize";
import { Device } from "src/devices/devices.model";

export const getPostgresConfig = async (configService: ConfigService): Promise<SequelizeModuleOptions> => ({
    dialect: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: Number(configService.get('POSTGRES_PORT')),
    username: configService.get( 'POSTGRES_USER'),
    password: configService.get( 'POSTGRES_PASSWORD'),
    database: configService.get( 'POSTGRES_DB'),
    models: [Device],
    autoLoadModels: true, 
})

