import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Device } from './devices.model';
import { CreateDeviceDto } from './dto/create-device.dto';
import { writeFile } from 'fs/promises';
// import * as path from 'path'

@Injectable()
export class DeviceService {

    constructor(@InjectModel(Device) private deviceRepository: typeof Device) {}

    async #writeDevicesToFile(path: string, devices: Device[]) {
        let devices_string = '';
        devices.map((device: Device) => {
            devices_string += `${device.token}: ${device.host}:${device.port}\n`
        })
        writeFile(path, devices_string)
    }

    async createDevice(dto: CreateDeviceDto) {
        const device = await this.deviceRepository.create(dto);

        const devices = await this.deviceRepository.findAll({order: [['id', 'ASC']], raw: true});
        this.#writeDevicesToFile(process.env.TOKEN_FILE_PATH, devices);

        return device;
    }

    async getAllDevices() {
        const devices = await this.deviceRepository.findAll({order: [['id', 'ASC']], raw: true});
        return devices;
    }

    async getDeviceById(id: string) {
        const device = await this.deviceRepository.findOne({where: {id: id}});
        return device;
    }

    async getDeviceByToken(token: string) {
        const device = await this.deviceRepository.findOne({where: {token: token}});
        return device;
    }

    async updateDeviceById(id:string, dto: CreateDeviceDto) {
        const device = await this.deviceRepository.update({...dto},{where: {id: id}, returning: true});

        const devices = await this.deviceRepository.findAll({order: [['id', 'ASC']], raw: true});
        this.#writeDevicesToFile(process.env.TOKEN_FILE_PATH, devices);

        return device;
    }

    async deleteDeviceById(id: string) {
        const device = await this.deviceRepository.destroy({where: {id: id}});

        const devices = await this.deviceRepository.findAll({order: [['id', 'ASC']], raw: true});
        this.#writeDevicesToFile(process.env.TOKEN_FILE_PATH, devices);

        return device;
    }
}
