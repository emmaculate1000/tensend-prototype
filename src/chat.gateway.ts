import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import moment from "moment";
@WebSocketGateway({
    cors:{
        origin:"*",
    }
})
export class ChatGateway{
    users=[];

    chats=[];
    @WebSocketServer()
    server;
    
    @SubscribeMessage('join')
    joinChat(@MessageBody() user,@ConnectedSocket() client: Socket){
        console.log(user);
        //push user into array
        let userObj={
            username:user.username,
            id:client.id,
            img:user.img,
            ref:user.id
        }
        this.users.push(userObj);
        //add user
        this.server.emit("join",this.users);
        //emit a load chat event
        client.emit("loadChat",this.chats);
        console.log(this.users);
    }

   /* @SubscribeMessage('joinUser')
    joinUser(@MessageBody() user,@ConnectedSocket() client: Socket){
        client.join(user.id);
        //emit a load chat event
        client.emit("loadChat",this.chats);
    }*/

    @SubscribeMessage("message")
    handleMessage(@MessageBody() message,@ConnectedSocket() client: Socket):void{
        //push message into chats
        this.chats.push(message);
        client.to(message.to.id).emit("message",message);
        console.log(message.to);
    }

    @SubscribeMessage('typing')
    async typing(@MessageBody("isTyping") isTyping:Boolean,@ConnectedSocket() client:Socket){
        client.broadcast.emit("typing",{data:isTyping});
    }
}