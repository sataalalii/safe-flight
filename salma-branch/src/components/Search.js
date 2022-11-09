import React, {Component} from "react";
import flightApi from "./flight-api";
class Search extends Component {
    constructor() {
        super();
        this.state = {
            from: "",
            to: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.name]: target.value,
        });
        }

    handleSubmit(event) {
        event.preventDefault();
        <flightApi />
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                From
                <input
                    name="from"
                    type="text"
                    value={this.state.from}
                    onChange={this.handleInputChange}
                />
                </label>
                <label>
                Password
                <input
                    name="to"
                    type="to"
                    value={this.state.to}
                    onChange={this.handleInputChange}
                />
                </label>
                <button type="submit">Search</button>
            </form>
            </div>
        );
    }
      
}