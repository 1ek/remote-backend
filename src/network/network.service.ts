import { Injectable } from '@nestjs/common';
import { DeviceService } from 'src/devices/devices.service';
import { Device } from 'src/devices/devices.model';
import * as util from 'node:util';
import { exec } from 'node:child_process';

const execAsync = util.promisify(exec)

@Injectable()
export class NetworkService {

    constructor(private readonly deviceService: DeviceService) {}

    async scanForDevices() {
        const { stdout, stderr } = await execAsync('nmap -p 5900 --open 192.168.88.0/24')
        if (stderr) {
            console.error('error: ' + stderr)
        }
        console.log(stdout)
        const ips_scan_list = stdout.toString().match(/\d+\.\d+\.\d+\.\d+/gm)
        const scan_time = stdout.toString().match(/in\s+(?<time>.*)\s+second/).groups.time
        const result = {
            ips_scan_list,
            scan_time
        }
        return result
    }

    async pingAllDevices() {
        const devices: Device[] = await this.deviceService.getAllDevices()
        const ips = devices.map(device => device.host).join(' ')
        const { stdout, stderr } = await execAsync(`nmap -sP ${ips}`) //убрать тестовые ip
        if (stderr) {
            console.error('error: ' + stderr)
        }
        console.log(stdout)
        const online_devices = stdout.toString().match(/\d+\.\d+\.\d+\.\d+/gm)
        return { online_devices }
    }

    async pingByIp(ip: string) {
        const { stdout, stderr } = await execAsync(`nmap -sP ${ip}`)
        if (stderr) {
            console.error('error: ' + stderr)
        }
        const online = !!Number(stdout.toString().match(/\((?<online>\d)\s+\w+\s+\w+\)/).groups.online)
        console.log(online)
        return {online: online}
    }



}
