import React from "react";
import ReactDOM from "react-dom";
// import Hello from "./hello";
import Welcome from "./welcome";
import { App } from "./app";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { init } from "./socket";

// const socket = io.connect();
// // what was there
// socket.on("hi", ({ msg }) => {
//     console.log(msg);
//     socket.emit("howareyo", {
//         msg: "Hello there"
//     });
// });

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    // it means the user is logged in
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

// var elem = <Hello gretee="dolly" color="sienna" />;

ReactDOM.render(elem, document.querySelector("main"));

//every place you have axios you put import from ./axios
//middleware for setting token to cookie, and copy of axios
