import React from "react";
import TodoListItem from "../todo-list-item";

import './todo-list.css';

const TodoList = ({ todos,onDeleted,onToggleImp,onToggleDone}) => {

    const elements = todos.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <li key = {id} className= "list__item">
                <TodoListItem {...itemProps}
                onDeleted = {() => onDeleted(id)}
                onToggleImp = {() => onToggleImp(id)}
                onToggleDone = {() => onToggleDone(id)} />
            </li>
        );
    });

    return (
        <ul className="list" >
            {elements}
        </ul>
    );
};

export default TodoList;