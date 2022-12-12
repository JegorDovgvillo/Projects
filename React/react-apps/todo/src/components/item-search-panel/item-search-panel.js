import React, { Component } from "react";

import './item-search-panel.css'

export default class ItemSearchPanel extends Component {

    buttons = [
        { name: 'all', label: 'all' },
        { name: 'active', label: 'active' },
        { name: 'done', label: 'done' }
    ];
    render() {
        const { filter,onFilterChange } = this.props
        const buttons = this.buttons.map(({ name, label }) => {
            const isActive = filter === name;
            const clazz = isActive ? 'active' : 'unactive';
            return (
                <button className= {`all active ${ clazz}`} key={name} 
                onClick = {() => onFilterChange(name)}> 
                {label}</button>
            )
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}
