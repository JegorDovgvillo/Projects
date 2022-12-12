import React, { Component } from "react";

import './todo-list-item.css';

export default class TodoListItem extends Component {

    render() {
        const { label, onDeleted, onToggleDone, onToggleImp, done, important } = this.props;

        let classNames = 'todo-list-item'
        if (done) {
            classNames += ' done';
        }
        if (important) {
            classNames += ' important';
        }

        return (
            <span className={classNames}>
                <span className="todo-list-item-label"
                    onClick={onToggleDone}>
                    {label}
                </span>
                <span className="buttons">
                    <button className="trash"
                        onClick={onDeleted}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <button className='impButton'
                        onClick={onToggleImp}>!</button>

                </span>
            </span>
        );
    }
}
