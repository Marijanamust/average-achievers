import axios from "./axios";

export function getFriends() {
    return axios.get("/friends-wannabes").then(({ data }) => {
        return {
            type: "GET_FRIENDS",
            allFriends: data
        };
    });
}

export function unfriend(otherUser) {
    return axios
        .post("/unfriend", otherUser)
        .then(() => {
            return {
                type: "UNFRIEND",
                unfriended: otherUser
            };
        })
        .catch(error => {
            console.log(error);
        });
}

export function acceptFriendRequest(otherUser) {
    return axios
        .post("/accept", otherUser)
        .then(() => {
            return {
                type: "ACCEPT_FRIENDSHIP",
                acceptedUser: otherUser
            };
        })
        .catch(error => {
            console.log(error);
        });
}

export function chatMessages(msgs) {
    return {
        type: "GET_MESSAGES",
        messages: msgs
    };
}

export function onlineUsers(ids) {
    return {
        type: "GET_ONLINE_USERS",
        onlineUsers: ids
    };
}

export function getPrivateMessages(msgs) {
    return {
        type: "GET_PRIVATE",
        privateTexts: msgs
    };
}
