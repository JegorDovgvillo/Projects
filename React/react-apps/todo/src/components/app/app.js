import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemSearchPanel from '../item-search-panel';
import CreateItem from '../create-new-item';
import './app.css'


export default class App extends Component {
    maxId = 100;
    state = {
        todoData: [
            this.CreateItems('Drink cofee'),
            this.CreateItems('Make Awesome'),
            this.CreateItems('Have a lunch')
        ],
        label: '',
        filter: 'all'
    };

    CreateItems(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }
    onDeleted = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArr = [...todoData.slice(0, idx),
            ...todoData.slice(idx + 1)];
            return {
                todoData: newArr
            };
        });
    };

    addItem = (text) => {
        const newItem = this.CreateItems(text)

        this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem];
            return {
                todoData: newArr
            };
        });
    }
    onToggleImp = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });

    }
    toggleProperty(arr, id, propertyName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const item = { ...oldItem, [propertyName]: !oldItem[propertyName] };

        return [
            ...arr.slice(0, idx),
            item, ...arr.slice(idx + 1)
        ];
    }
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {

            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    }
    search(todoData, label) {
        if (label.length === 0) {
            return todoData
        }
        return todoData.filter((item) => {
            return item.label.toLowerCase().indexOf(label.toLowerCase()) > -1;
        })
    }
    searchItem = (label) => {
        this.setState({ label });
    }
    onFilterChange = (filter) => {
        this.setState({ filter });
    }
    filter(todoData, filter) {
        switch (filter) {
            case 'all':
                return todoData;
            case 'active':
                return todoData.filter((item) => !item.done);
            case 'done':
                return todoData.filter((item) => item.done);
                default:
                    return todoData;
        }
    }

    render() {
        const { todoData, label,filter } = this.state
        const visibleItems = this.filter(this.search(todoData, label),filter)
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className='bodyList'>
                <AppHeader todo={todoCount} done={doneCount} />
                <div className='topPanel'>
                    <SearchPanel searchItem={this.searchItem} />
                    <ItemSearchPanel  filter= {filter}
                    onFilterChange = {this.onFilterChange}/>
                </div>

                <TodoList todos={visibleItems}
                    onDeleted={this.onDeleted}
                    onToggleDone={this.onToggleDone}
                    onToggleImp={this.onToggleImp} />
                <CreateItem
                    addItem={this.addItem} />
            </div>
        )
    };
};

