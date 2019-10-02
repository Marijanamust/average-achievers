import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => console.log(this.state)
        );
    }

    handleClick(e) {
        e.preventDefault();
        // console.log("It has been clicked");
        // console.log("THIS STATE", this.state);
        axios
            .post("/login", this.state)
            .then(response => {
                console.log(response);
                if (response.data === true) {
                    this.setState({ error: false });
                    console.log(response.data);
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
            })
            .catch(error => {
                console.log("error in post", error);
                // me.showErrorMod = true;
            });
    }

    render() {
        const error = this.state.error;
        return (
            <div>
                <h3>Login for mediocrity!</h3>
                {error && <p>Oooops Error</p>}
                <form>
                    <input
                        name="email"
                        type="email"
                        placeholder="email"
                        onChange={this.handleChange}
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}>Submit</button>
                </form>
            </div>
        );
    }
}
