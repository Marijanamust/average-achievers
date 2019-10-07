import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    console.log("here are my last chat messages");

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();

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
