import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DeviceService } from './devices.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Device } from './devices.model';

@Module({
  controllers: [DevicesController],
  providers: [DeviceService],
  imports: [
    SequelizeModule.forFeature([Device])
  ],
  exports: [DeviceService]
})
export class DevicesModule {}
