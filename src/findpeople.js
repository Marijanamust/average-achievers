import React from "react";
import axios from "./axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function FindPeople() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");

    useEffect(
        () => {
            let ignore = false;

            (async () => {
                const response = await axios.get("/last/users/" + user);

                if (!ignore) {
                    setUsers(response.data);
                }
            })();
            return () => {
                ignore = true;
            };
        },
        [user]
    );

    const onUserChange = e => {
        setUser(e.target.value);
    };

    return (
        <div className="findUsersContainer">
            <h1>Find people</h1>
            {user == "" && <p>Check out who just joined!</p>}
            <p>Are you looking for someone special?</p>
            <div>
                <input onChange={onUserChange} />
            </div>
            <ul>
                {users != "" ? (
                    users.map(user => (
                        <li key={user.id}>
                            <Link
                                to={{ pathname: `/users/${user.id}` }}
                                className="usersBox"
                            >
                                <img src={user.imageurl || "/sheep.jfif"} />
                                <p>
                                    {user.first} {user.last}
                                </p>
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No users matching</li>
                )}
            </ul>
        </div>
    );
}
