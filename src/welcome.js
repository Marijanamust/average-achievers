import React from "react";
// import axios from "axios";
import Register from "./register";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
//Renders a welcome message, logo, and Registration component

export default function() {
    return (
        <HashRouter>
            <div className="welcomeContainer">
                <div className="welcomeDiv">
                    <h1>AVERAGE ACHIEVER</h1>
                    <div className="welcomeText">
                        <p>
                            Do you feel like the world is not your oyster? Is
                            your limitation not only in your imagination?
                        </p>
                        <p>
                            You don't want to shoot for the moon (cause even
                            when you miss you don't land among the stars)?{" "}
                        </p>
                        <p>
                            You are fine if later becomes never? You dream
                            smaller?
                        </p>
                        <p> No, you can't?</p>

                        <p>
                            Or you strive for more but the more doesn't strive
                            for you?
                        </p>
                        <p> Then this is your place!</p>
                        <p>
                            Cause together we are almost as good as the other
                            group
                        </p>
                        <p>
                            {" "}
                            (That we would like to be in but can't be bothered){" "}
                        </p>
                        <p>Sincerely,</p>
                        <p className="signature">Almost Everybody</p>
                    </div>
                    <div>
                        <Route exact path="/" component={Register} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </div>
        </HashRouter>
    );
}
