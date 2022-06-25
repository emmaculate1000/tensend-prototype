import { Socket } from "socket.io";
export declare class ChatGateway {
    users: any[];
    chats: any[];
    server: any;
    joinChat(user: any, client: Socket): void;
    handleMessage(message: any, client: Socket): void;
    typing(isTyping: Boolean, client: Socket): Promise<void>;
}
