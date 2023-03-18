import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeviceService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';

@Controller('devices')
export class DevicesController {

    constructor(private readonly deviceService: DeviceService) {}

    @Post()
    createDevice(@Body() deviceDto: CreateDeviceDto) {
        return this.deviceService.createDevice(deviceDto)
    }

    @Get()
    getAll() {
        return this.deviceService.getAllDevices()
    }

    @Get('/id/:id')
    getById(@Param('id') id: string) {
        return this.deviceService.getDeviceById(id)
    }

    @Get('/token/:token')
    getByToken(@Param('token') token: string) {
        return this.deviceService.getDeviceByToken(token)
    }

    @Put('/:id')
    updateDevice(@Body() deviceDto: CreateDeviceDto, @Param('id') id: string) {
        return this.deviceService.updateDeviceById(id, deviceDto)
    }

    @Delete('/:id')
    deleteDevice(@Param('id') id: string) {
        return this.deviceService.deleteDeviceById(id)
    }
}
