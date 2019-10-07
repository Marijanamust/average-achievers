import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector, useDispatch } from "react-redux";
import { getFriends } from "./actions";
import { getPrivateMessages } from "./actions";

export function Texting({ removeMessage, otheruser }) {
    const dispatch = useDispatch();

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            let textInfo = {
                text: e.target.value,
                receiver_id: otheruser
            };
            socket.emit("new text", textInfo);

            e.target.value = "";
        }
    };

    const elemRef = useRef();

    const privateTexts = useSelector(state => {
        return state && state.privateTexts;
    });

    const chatFriend = useSelector(state => {
        return (
            state.allFriends &&
            state.allFriends.find(friend => {
                console.log(friend.id);
                return friend.id == otheruser;
            })
        );
    });

    useEffect(() => {
        dispatch(getFriends());
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        socket.emit("get texts", otheruser);
        socket.on("check texts", data => {
            let check = data.find(message => {
                return message.id == otheruser;
            });

            if (check) {
                dispatch(getPrivateMessages(data));
            }
        });
        removeMessage(otheruser);
    }, []);

    useEffect(
        () => {
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        },
        [privateTexts]
    );

    return (
        <div className="chatMsgsContainer">
            <h1>CHAT WITH {chatFriend && chatFriend.first}</h1>
            <div className="chatMessages" ref={elemRef}>
                <ul>
                    {privateTexts &&
                        privateTexts.map((message, index) => {
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
