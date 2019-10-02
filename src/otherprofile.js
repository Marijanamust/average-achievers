import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { FriendButton } from "./friendbutton";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            first: "",
            last: "",
            imageUrl: "",
            bio: ""
        };
    }
    async componentDidMount() {
        console.log("Other Profile mounted");
        try {
            const userData = await axios.get(
                "/api/users/" + this.props.match.params.id
            );

            if (userData.data.sameuser) {
                this.props.history.push("/");
            } else if (userData.data.nouser) {
                this.props.history.push("/");
            } else {
                this.setState({
                    first: userData.data.first,
                    last: userData.data.last,
                    imageUrl: userData.data.imageurl,
                    user_id: userData.data.id,
                    bio: userData.data.bio
                });
            }
        } catch (error) {
            console.log("error in post", error);
        }
        // console.log("ONLINE", this.state.onlineUsers);
    }
    render() {
        var imageurl = this.state.imageUrl || "/sheep.jfif";
        return (
            <React.Fragment>
                <div className="profile">
                    <img src={imageurl} />
                    <div className="txtProfile">
                        <h1>
                            {this.state.first} {this.state.last}
                        </h1>
                        <p>{this.state.bio}</p>
                        <FriendButton id={this.props.match.params.id} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
