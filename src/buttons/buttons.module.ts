import { Module } from '@nestjs/common';
import { ButtonsController } from './buttons.controller';
import { ButtonsService } from './buttons.service';
import { HttpModule } from '@nestjs/axios';
import { DevicesModule } from 'src/devices/devices.module';

@Module({
    imports: [DevicesModule, HttpModule],
    controllers: [ButtonsController],
    providers: [ButtonsService]
})
export class ButtonsModule {}
