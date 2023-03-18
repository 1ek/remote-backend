import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkController } from './network.controller';
import { DevicesModule } from 'src/devices/devices.module';

@Module({
  imports: [DevicesModule],
  controllers: [NetworkController],
  providers: [NetworkService]
})
export class NetworkModule {}
