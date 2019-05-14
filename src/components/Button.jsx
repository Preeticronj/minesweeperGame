import React from "react";

class Button extends React.Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <div className="btn">
                <button type="button" onClick={() => { this.props.fun() }}>{this.props.buttonText}</button>
            </div>
        )
    }
}
export default Button;