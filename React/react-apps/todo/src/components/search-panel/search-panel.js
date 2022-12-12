import React, { Component } from "react";

import './search-panel.css'

export default class SearchPanel extends Component {
    
    state = {
        label: ''
    }
    searchItem =(event) => {
        const label = event.target.value;
        this.setState({label});
        this.props.searchItem(label);
    }

    render() {
        const searchText = 'Type here to search';

    return (
        <div className="bodyList__topPanel">
            <input placeholder={searchText}
                onChange={this.searchItem}
                value = {this.state.label} />
        </div>
    );
}
};

