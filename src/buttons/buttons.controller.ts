import { Controller, Get, Param } from '@nestjs/common';
import { ButtonsService } from './buttons.service';


@Controller()
export class ButtonsController {

    constructor(private readonly buttonService: ButtonsService) {}

    /* 
     * Получает на вход ("токен прибора", "id кнопки")
     * Сравнивает полученный токен с приборами из БД
     * Отправляет запрос на нажатие нужной кнопки на нужный прибор
    */
    @Get('/device/:dev_token/button/:btn_id')
    getProxyRequest(
        @Param('dev_token') device_token: string,
        @Param('btn_id') btn: string
    ) {
        return this.buttonService.getProxyRequest(device_token, btn);
    }
}
