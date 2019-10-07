import React from "react";
import axios from "./axios";

export class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            editing: false,
            draftbio: ""
        };
        this.showEditBio = this.showEditBio.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    showEditBio() {
        if (this.state.editing) {
            this.setState({
                editing: false
            });
        } else {
            this.setState({
                editing: true,
                draftbio: this.props.bio
            });
        }
    }
    handleChange(e) {
        console.log(e.target.value);
        this.setState(
            {
                draftbio: e.target.value
            },
            () => console.log(this.state)
        );
    }
    async updateBio(e) {
        e.preventDefault();
        try {
            const bioResponse = await axios.post("/bio", this.state);

            this.props.setBio(bioResponse.data[0].bio);
            this.showEditBio();
        } catch (err) {
            console.log("error in post", err);
        }
    }

    render() {
        return (
            <div className="bio">
                {this.state.editing && (
                    <div className="textareaDiv">
                        <textarea
                            name="bio"
                            form="bio"
                            defaultValue={this.props.bio}
                            onChange={this.handleChange}
                        />
                        <button onClick={this.updateBio}>Submit</button>
                    </div>
                )}
                {!this.state.editing && !this.props.bio && (
                    <button onClick={this.showEditBio}>Add your bio</button>
                )}
                {!this.state.editing && this.props.bio && (
                    <div>
                        <p className="bioText">{this.props.bio}</p>
                        <button onClick={this.showEditBio}>
                            Edit your bio
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
