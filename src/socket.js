import * as io from "socket.io-client";
export let socket;
import { chatMessages } from "./actions";
import { onlineUsers, getPrivateMessages } from "./actions";

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("ten messages", msgs => {
            store.dispatch(chatMessages(msgs));
        });
        socket.on("online users", ids => {
            store.dispatch(onlineUsers(ids));
        });
        socket.on("all texts", data => {
            console.log("GOT ALL TEXTS FROM OTHER GUY");
            store.dispatch(getPrivateMessages(data));
        });
        // socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));
        //
        // socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
}
