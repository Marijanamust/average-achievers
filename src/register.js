import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
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

        axios
            .post("/welcome", this.state)
            .then(response => {
                if (response.data === true) {
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
            })
            .catch(error => {
                console.log("error in post", error);
            });
    }

    render() {
        const error = this.state.error;
        return (
            <div>
                <h3>JOIN ALMOST EVERYONE</h3>
                {error && <p>Oooops Error</p>}
                <form>
                    <input
                        name="first"
                        type="text"
                        placeholder="first"
                        onChange={this.handleChange}
                    />
                    <input
                        name="last"
                        type="text"
                        placeholder="last"
                        onChange={this.handleChange}
                    />
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
                <div>
                    <Link to="/login">Already a member?</Link>
                </div>
            </div>
        );
    }
}
