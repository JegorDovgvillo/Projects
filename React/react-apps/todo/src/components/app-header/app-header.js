import React from "react";

import './app-header.css'
const AppHeader = ({todo,done}) => {
    return (
        <div className="bodyList__header">
        <h1>Todo list</h1>
        <p>{todo} more to do, {done} done</p>
        </div>
    );
};

export default AppHeader;