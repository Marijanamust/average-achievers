import React from "react";
import axios from "./axios";

export class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {
            file: ""
        };
        this.addFile = this.addFile.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
    }
    addFile(e) {
        this.file = e.target.files[0];
    }
    async changeAvatar(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.file);
        try {
            const response = await axios.post("/upload", formData);

            this.props.updatePic(response.data[0].imageurl);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        var imageurl = this.props.imageUrl || "/sheep.jfif";
        return (
            <div className="overlay">
                <div className="imageModal">
                    <div className="imgDiv">
                        <img src={imageurl} />
                    </div>
                    <div className="fileDiv">
                        <form className="imageForm" autoComplete="off">
                            <input
                                onChange={this.addFile}
                                type="file"
                                name="file"
                                accept="image/*"
                                className="inputfile"
                                id="file"
                            />
                            <label htmlFor="file" className="fileLabel">
                                Choose a file
                            </label>
                            <button
                                onClick={this.changeAvatar}
                                className="fileBtn"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    <p onClick={this.props.showModal} className="closeModal">
                        X
                    </p>
                </div>
            </div>
        );
    }
}
