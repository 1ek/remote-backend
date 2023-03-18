import { OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'

interface DataToServer {
    userId: string;
    sender: string;
    room: string;
    cursor: {
        transX: number;
        transY: number;
    }
}

@WebSocketGateway(5228, {
    cors: {
        origin: ['http://192.168.1.71:5173', 'http://localhost:5173', 'http://192.168.88.35:5173', 'http://185.128.105.187:5173', 'http://www.1ek.xyz:5173']
    }
})


export class Gateway implements OnModuleInit {

    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connection', socket => {
            console.log('Connected: ', socket.id)
            socket.on('disconnect', reason => {
                console.log(`Dicsonnected: ${socket.id} | Reason: ${reason}`)
            })
        })
    } 

    @SubscribeMessage('joinRoom')
    handleRoomJoin(client: Socket, data: {room: string, sender: string}) {
        client.join(data.room)
        this.server.in(data.room).fetchSockets().then((users) => {
            const clients = users.map(client => client.id)
            this.server.volatile.emit('joinedRoom', { room: data.room, users: clients, userId: client.id, sender: data.sender })
            console.log({ room: data.room, users: users.length })
        })
        
    }

    @SubscribeMessage('leaveRoom')
    handleRoomLeave(client: Socket, room: string) {
        client.leave(room)
        this.server.in(room).fetchSockets().then((users) => {
            const clients = users.map(client => client.id)
            this.server.volatile.emit('leftRoom', { room, users: clients, userId: client.id })
            console.log({ room, users: users.length })
        })
        
    }

    @SubscribeMessage('dataToServer')
    handleData(client: Socket, data: DataToServer) {
        // console.log(data)
        this.server.to(data.room).emit('dataToClient', data)
    }

}