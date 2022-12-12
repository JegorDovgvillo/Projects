import React, { Component } from "react";
import './create-new-item.css'

export default class CreateItem extends Component {

    state = {
        label: ''
    }
    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.addItem(this.state.label);
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form className="createNew"
                onSubmit={this.onSubmit}>
                <input type="text" className="form-control"
                    onChange={this.onLabelChange}
                    placeholder=" what needs to be done"
                    value={this.state.label}></input>
                <button type="button" className="addButton" >
                    Add
                </button>
            </form>
        )
    };
}
