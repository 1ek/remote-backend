import { Controller, Get, Param } from '@nestjs/common';
import { NetworkService } from './network.service';

@Controller('network')
export class NetworkController {

    constructor(private readonly networkService: NetworkService) {}

    /* 
     * Проводит сканирование сети на наличие хостов в открытым 5900 портом (порт VNC)
     * Возвращает объект: { ips_scan_list: [массив хостов], scan_time: время сканирования }
    */
    @Get('/scan')
    networkScan() {
        return this.networkService.scanForDevices()
    }

    /* 
     * Обращается к БД и пингует хосты полученных приборов
     * Возвращает объект: { online_devices: [массив хостов, которые сейчас онлайн] }
    */
    @Get('/ping')
    networkPing() {
        return this.networkService.pingAllDevices()
    }

    /* 
     * Получает на вход хост
     * Пингует переданный хост
     * Возвращает объект: { online: true/false }
    */
    @Get('/ping/:id')
    pingByIp(@Param('id') ip: string) {
        return this.networkService.pingByIp(ip)
    }
}
