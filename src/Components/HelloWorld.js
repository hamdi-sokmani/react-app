import React, {Component} from "react";

class HelloWorld extends Component {
    render() {
        return (
            <div>
                <h1>Hello World from {this.props.name} !</h1>
            </div>
        );
    }
}

export default HelloWorld;