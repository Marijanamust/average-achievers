import React from "react";
import axios from "./axios";
import { useState, useEffect } from "react";

export function FriendButton(id) {
    const [otherUser, setOtherUser] = useState(id);
    const [button, setButton] = useState("");

    useEffect(() => {
        axios
            .get("/button/" + otherUser.id)
            .then(response => {
                setButton(response.data.button);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const buttonFunc = {
        "Send friend request": function() {
            postToFriendships("/request");
        },
        "Cancel friend request": function() {
            postToFriendships("/cancel");
        },
        "Accept friend request": function() {
            postToFriendships("/accept");
        },
        Unfriend: function() {
            postToFriendships("/unfriend");
        }
    };

    const postToFriendships = function(url) {
        axios
            .post(url, otherUser)
            .then(response => {
                setButton(response.data.button);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="requestButton">
            <button onClick={buttonFunc[button]}>{button}</button>
        </div>
    );
}
