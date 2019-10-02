import React from "react";

export function ProfilePic({ first, last, imageUrl, showModal, user_id }) {
    var imageurl = imageUrl || "/sheep.jfif";
    return (
        <React.Fragment>
            <img onClick={showModal} src={imageurl} />
        </React.Fragment>
    );
}
