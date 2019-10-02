import React from "react";
import Gretee from "./gretee.js";
import GreteeChanger from "./greteechanger";
import axios from "axios";

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gretee: this.props.gretee
        };
        this.handleChange = this.handleChange.bind(this);
    }
    changeGretee(gretee) {
        this.setState({
            gretee: gretee
        });
    }
    handleChange(e) {
        console.log(e.target.value, e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
                dog: true
            },
            () => console.log(this.state)
        );
    }

    render() {
        const isGoodDay = true;
        return (
            <div style={{ color: this.props.color, fontSize: "26px" }}>
                Hello, <Gretee gretee={this.state.gretee} />!
                <ul>
                    <li>Batman</li>
                    <li>Batman</li>
                    <li>
                        {Math.random() >= 0.5 ? (
                            <span>Leo</span>
                        ) : (
                            <span>Jeniffer</span>
                        )}
                    </li>
                </ul>
                {isGoodDay && <div>Today is good</div>}
                <GreteeChanger
                    changeGretee={gretee => this.changeGretee(gretee)}
                />
                <form>
                    <input
                        name="first"
                        placeholder="first"
                        onChange={this.handleChange}
                    />
                    <input
                        name="last"
                        placeholder="last"
                        onChange={this.handleChange}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
