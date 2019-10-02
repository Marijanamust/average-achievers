import React from "react";
import { ProfilePic } from "./profilepic";
import { Uploader } from "./uploader";
import { Profile } from "./profile";
import { OtherProfile } from "./otherprofile";
import { FindPeople } from "./findpeople";
import { DeleteProfile } from "./deleteprofile";
import { Friends } from "./friends";
import { Chat } from "./chat";
import { Texting } from "./texting";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { socket } from "./socket";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imageUrl: "",
            user_id: "",
            bio: "",
            uploaderIsVisible: false,
            deleteModalIsVisible: false,
            notification: false
        };
        this.showModal = this.showModal.bind(this);
        this.updatePic = this.updatePic.bind(this);
        this.setBio = this.setBio.bind(this);
        this.showDelete = this.showDelete.bind(this);
        this.hideNotifications = this.hideNotifications.bind(this);
        this.removeMessage = this.removeMessage.bind(this);
    }

    async componentDidMount() {
        console.log("App mounted");
        try {
            const userData = await axios.get("/user");
            socket.on("text notification", data => {
                if (
                    window.location.pathname.includes("texting") ||
                    window.location.pathname.includes("friends")
                ) {
                    if (
                        this.state.textSenderId &&
                        this.state.textSenderId.length
                    ) {
                        this.setState({
                            textSenderId: [...this.state.textSenderId, data]
                        });
                    } else {
                        this.setState({ textSenderId: [data] });
                    }
                } else {
                    this.setState({ notification: true });
                    if (
                        this.state.textSenderId &&
                        this.state.textSenderId.length
                    ) {
                        this.setState({
                            textSenderId: [...this.state.textSenderId, data]
                        });
                    } else {
                        this.setState({ textSenderId: [data] });
                    }
                }
            });
            this.setState({
                first: userData.data.first,
                last: userData.data.last,
                imageUrl: userData.data.imageurl,
                user_id: userData.data.id,
                bio: userData.data.bio
            });
        } catch (error) {
            console.log("error in post", error);
        }
    }
    showModal() {
        if (this.state.uploaderIsVisible === true) {
            this.setState({
                uploaderIsVisible: false
            });
        } else {
            this.setState({
                uploaderIsVisible: true
            });
        }
    }

    removeMessage(removeUser) {
        if (this.state.textSenderId && this.state.textSenderId.length) {
            let newTextSender = this.state.textSenderId.filter(item => {
                return item != removeUser;
            });
            this.setState({ textSenderId: newTextSender });
        }
    }

    hideNotifications() {
        this.setState({ notification: false });
    }

    showDelete() {
        if (this.state.deleteModalIsVisible === true) {
            this.setState({
                deleteModalIsVisible: false
            });
        } else {
            this.setState({
                deleteModalIsVisible: true
            });
        }
    }

    updatePic(image) {
        this.setState({
            imageUrl: image,
            uploaderIsVisible: false
        });
    }

    setBio(bio) {
        this.setState({
            bio: bio
        });
    }

    render() {
        if (this.state.imageUrl == "") {
            return null;
        }
        return (
            <BrowserRouter>
                <React.Fragment>
                    <header>
                        <h2>AVERAGE ACHIEVER</h2>
                        <div className="rightHead">
                            <Link to="/chat">Chat</Link>
                            <Link to="/users">Find people</Link>
                            <Link
                                to="/friends"
                                onClick={this.hideNotifications}
                            >
                                {this.state.notification && (
                                    <p className="check">CHECK</p>
                                )}
                                Friends and wannabes
                            </Link>
                            <Link to="/">
                                {this.state.first} {this.state.last}
                            </Link>
                            <ProfilePic
                                first={this.state.first}
                                last={this.state.last}
                                imageUrl={this.state.imageUrl}
                                showModal={this.showModal}
                                user_id={this.user_id}
                            />
                            <a href="/logout">Logout</a>
                        </div>
                    </header>

                    <div className="mainDiv">
                        <div>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        first={this.state.first}
                                        last={this.state.last}
                                        imageUrl={this.state.imageUrl}
                                        bio={this.state.bio}
                                        user_id={this.user_id}
                                        showModal={this.showModal}
                                        setBio={this.setBio}
                                        showDelete={this.showDelete}
                                    />
                                )}
                            />
                            <Route path="/users/:id" component={OtherProfile} />
                            <Route exact path="/users" component={FindPeople} />
                            <Route
                                path="/friends"
                                render={() => {
                                    return (
                                        <Friends
                                            textSenderId={
                                                this.state.textSenderId
                                            }
                                        />
                                    );
                                }}
                            />
                            <Route path="/chat" component={Chat} />
                            <Route
                                path="/texting/:otheruser"
                                render={props => {
                                    return (
                                        <Texting
                                            removeMessage={this.removeMessage}
                                            otheruser={
                                                props.match.params.otheruser
                                            }
                                        />
                                    );
                                }}
                            />
                        </div>

                        {this.state.uploaderIsVisible && (
                            <Uploader
                                user_id={this.state.user_id}
                                imageUrl={this.state.imageUrl}
                                updatePic={this.updatePic}
                                showModal={this.showModal}
                            />
                        )}
                        {this.state.deleteModalIsVisible && (
                            <DeleteProfile
                                first={this.state.first}
                                last={this.state.last}
                                user_id={this.state.user_id}
                                imageUrl={this.state.imageUrl}
                                showDelete={this.showDelete}
                            />
                        )}
                    </div>

                    <footer />
                </React.Fragment>
            </BrowserRouter>
        );
    }
}
