import React from "react";
import { ProfilePic } from "./profilepic";
import { BioEditor } from "./bioeditor";

export function Profile({
    first,
    last,
    imageUrl,
    bio,
    user_id,
    showModal,
    setBio,
    showDelete
}) {
    return (
        <div className="profile">
            <div className="imgAndDeleteContainer">
                <ProfilePic
                    first={first}
                    last={last}
                    imageUrl={imageUrl}
                    showModal={showModal}
                    user_id={user_id}
                />
                <button onClick={showDelete} className="deleteInProfile">
                    Delete Profile
                </button>
            </div>
            <div className="txtProfile">
                <h1>
                    {first} {last}
                </h1>

                <BioEditor bio={bio} setBio={setBio} user_id={user_id} />
            </div>
        </div>
    );
}
