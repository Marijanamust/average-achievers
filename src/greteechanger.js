import React from "react";

export default function GreteeChanger(props) {
    return (
        <input type="text" onChange={e => props.changeGretee(e.target.value)} />
    );
}
