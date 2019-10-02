import { parseDate } from "../utils/helpers";

export default function reducer(state = {}, action) {
    if (action.type === "ACTION_THAT_BLA") {
        // then change redux state
    }
    if (action.type === "GET_ANIMALS") {
        console.log("GET ANIMALS IN REDUCER", action);
        // create a clone with different property, this is cloning with spread operator
        state = {
            ...state,
            cuteAnimals: action.cuteAnimals
        };
        // cuteanimals on the left you can call whatever you want cause we are defining first time
    }
    if (action.type === "GET_FRIENDS") {
        state = {
            ...state,
            allFriends: action.allFriends
        };
    }
    if (action.type === "UNFRIEND") {
        console.log("UNFRIEND IN REDUCER", action);
        state = {
            ...state,
            allFriends: state.allFriends.filter(friend => {
                if (friend.id != action.unfriended.id) {
                    return friend;
                }
            })
        };
    }

    if (action.type === "ACCEPT_FRIENDSHIP") {
        console.log("ACCEPT IN REDUCER", action);
        state = {
            ...state,
            allFriends: state.allFriends.map(friend => {
                if (friend.id != action.acceptedUser.id) {
                    return friend;
                } else {
                    console.log(friend);
                    return {
                        ...friend,
                        accepted: true
                    };
                }
            })
        };
    }

    if (action.type === "GET_MESSAGES") {
        console.log("ACTION MESSAGES", action.messages);

        state = {
            ...state,
            messages: action.messages.map(message => {
                return {
                    ...message,
                    created_at: parseDate(message.created_at)
                };
            })
        };
    }

    if (action.type === "GET_ONLINE_USERS") {
        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }
    if (action.type === "GET_PRIVATE") {
        console.log("PRIVATE MESSAGES", action.privateTexts);

        state = {
            ...state,
            privateTexts: action.privateTexts.map(message => {
                return {
                    ...message,
                    created_at: parseDate(message.created_at)
                };
            })
        };
    }

    return state;
}
