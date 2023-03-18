import { Module } from "@nestjs/common";
import { Gateway } from "./websockets.gateway";


@Module({
    providers: [Gateway],
})

export class WebsocketsModule {}