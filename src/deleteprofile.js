import axios from "./axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "./actions";
import { Link } from "react-router-dom";

export function DeleteProfile({ first, last, user_id, imageUrl, showDelete }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends());
    }, []);
    const friends = useSelector(state => {
        return (
            state.allFriends &&
            state.allFriends.filter(friend => {
                return friend.accepted === true;
            })
        );
    });

    const deleteProfileFunc = function(e) {
        e.preventDefault();
        axios
            .post("/deleteuser")
            .then(() => {
                document.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="overlay">
            <div className="deleteModal">
                <div className="imgDiv">
                    <img src={imageUrl || "/sheep.jfif"} />
                </div>
                <div className="fileDiv">
                    <h3>
                        Are you sure you want to delete your profile {first}{" "}
                        {last}?
                    </h3>
                    {friends != "" ? (
                        <p>All these people will be missing you!</p>
                    ) : (
                        <div>
                            <p>
                                You don't even have any friends! Why don't you
                                try finding one first?
                            </p>
                        </div>
                    )}
                    <div className="friendsContainerInModal">
                        <ul>
                            {friends &&
                                friends.map((friend, index) => {
                                    return (
                                        <li key={index}>
                                            <img
                                                src={
                                                    friend.imageurl ||
                                                    "/sheep.jfif"
                                                }
                                            />
                                            <p>
                                                {friend.first} {friend.last}
                                            </p>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    <div className="buttonsModal">
                        {friends != "" && (
                            <button onClick={showDelete}>Not really</button>
                        )}
                        {friends == "" && (
                            <Link to="/users" onClick={showDelete}>
                                Find people
                            </Link>
                        )}

                        <button
                            onClick={e => {
                                deleteProfileFunc(e);
                            }}
                            className="deleteBtn"
                        >
                            Delete anyway
                        </button>
                    </div>
                </div>
                <p onClick={showDelete} className="closeModal">
                    X
                </p>
            </div>
        </div>
    );
}
