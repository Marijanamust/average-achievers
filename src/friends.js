import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "./actions";
import { Link } from "react-router-dom";
import { unfriend, acceptFriendRequest } from "./actions";
import { socket } from "./socket";
import { useState } from "react";

export function Friends(props) {
    const dispatch = useDispatch();
    // const [senderId, setSenderId] = useState(props.textSenderId);
    useEffect(() => {
        dispatch(getFriends());
        // return ()=>{
        //     props.resetList
        // }
    }, []);
    // const userIds=

    const wannabes = useSelector(state => {
        return (
            state.allFriends &&
            state.allFriends.filter(friend => {
                return friend.accepted != true;
            })
        );
    });

    const friends = useSelector(state => {
        // console.log("IN SELECTOR", state.allFriends);

        return (
            state.allFriends &&
            state.allFriends.filter(friend => {
                return friend.accepted === true;
            })
        );
    });
    const online = useSelector(state => {
        return state.onlineUsers;
    });

    return (
        <div className="friendsPage">
            <div className="friendsContainer">
                <div className="friendsPart">
                    <h1>List of friends</h1>
                    {friends == "" && (
                        <div>
                            <p>
                                Oh crap, you have no friends. Why don´t you find
                                some?
                            </p>
                            <Link to="/users">Find people</Link>
                        </div>
                    )}
                </div>
                <ul>
                    {friends &&
                        friends.map((friend, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        to={{
                                            pathname: `/users/${friend.id}`
                                        }}
                                        className="usersBox"
                                    >
                                        <img
                                            src={
                                                friend.imageurl || "/sheep.jfif"
                                            }
                                        />
                                        <p>
                                            {friend.first} {friend.last}
                                        </p>
                                    </Link>
                                    {online && online.indexOf(friend.id) > -1 && (
                                        <div>
                                            <p className="online">
                                                {friend.first} is online
                                            </p>
                                        </div>
                                    )}
                                    {props.textSenderId &&
                                        props.textSenderId.indexOf(friend.id) >
                                            -1 && (
                                        <p className="textedYou">
                                            {friend.first} messaged you
                                        </p>
                                    )}
                                    <Link
                                        to={{
                                            pathname: `/texting/${friend.id}`
                                        }}
                                        className="textingLink"
                                    >
                                        Text {friend.first}
                                    </Link>

                                    <button
                                        onClick={() =>
                                            dispatch(unfriend(friend))
                                        }
                                    >
                                        Unfriend
                                    </button>
                                </li>
                            );
                        })}
                </ul>
            </div>
            <div className="wannabeePart">
                <h1>Pending requests</h1>
                {wannabes == "" && (
                    <div>
                        <p>
                            Nobody wants to be your friend at the moment. Why
                            don´t you do the first move?
                        </p>
                        <Link to="/users">Find people</Link>
                    </div>
                )}
                <div className="friendsContainer">
                    <ul>
                        {wannabes &&
                            wannabes.map((wannabe, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            to={{
                                                pathname: `/users/${wannabe.id}`
                                            }}
                                            className="usersBox"
                                        >
                                            <img
                                                src={
                                                    wannabe.imageurl ||
                                                    "/sheep.jfif"
                                                }
                                            />
                                            <p>
                                                {wannabe.first} {wannabe.last}
                                            </p>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    acceptFriendRequest(wannabe)
                                                )
                                            }
                                        >
                                            Accept friend request
                                        </button>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
