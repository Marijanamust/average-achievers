import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    // const chatMessages = useSelector(state => state && state.chatMessages);
    console.log("here are my last chat messages");

    const keyCheck = e => {
        console.log(e.key);
        // enter
        if (e.key === "Enter") {
            e.preventDefault();
            console.log(e.target.value);
            socket.emit("singleMessage", e.target.value);
            e.target.value = "";
        }
    };

    const elemRef = useRef();

    const messages = useSelector(state => {
        return state && state.messages;
    });

    useEffect(
        () => {
            console.log("chat mounted");
            console.log("elemref", elemRef.current);
            console.log("scroll top", elemRef.current.scrollTop);
            console.log("scroll height", elemRef.current.scrollHeight);
            console.log("clientHeight", elemRef.current.clientHeight);
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        },
        [messages]
    );

    return (
        <div className="chatMsgsContainer">
            <h1>CHAT ROOM</h1>
            <div className="chatMessages" ref={elemRef}>
                <ul>
                    {messages &&
                        messages.map((message, index) => {
                            return (
                                <li key={index}>
                                    <img
                                        src={message.imageurl || "/sheep.jfif"}
                                    />
                                    <div className="messageDiv">
                                        <p className="name">
                                            {" "}
                                            {message.first} {message.last}{" "}
                                            {message.created_at}
                                        </p>
                                        <p>{message.message}</p>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            />
        </div>
    );
}
