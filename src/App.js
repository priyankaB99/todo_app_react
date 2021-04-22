import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todosList: [],
            sort: false
        };
        this.loadTodos = this.loadTodos.bind(this);
        this.printTodos = this.printTodos.bind(this);
        this.sort = this.sort.bind(this)
    }

    componentDidMount() {
        this.loadTodos();
    }

    loadTodos() {
        let currentComponent = this;
        // LOAD TODOS
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var todos = JSON.parse(this.responseText);
                console.log(todos)
                console.log("SORT?", currentComponent.state.sort)
                if (currentComponent.state.sort) {
                    todos.sort(function (a, b) {
                        // return b.created_at - a.created_at;
                        // return parseFloat(b.created_at) - parseFloat(a.created_at);
                        return a.text.localeCompare(b.text);
                    });
                }
                currentComponent.setState({
                    todosList: todos
                });
            }
            else {
                console.log("Load error", this);
            }
        };
        xhttp.open("GET", "https://cse204.work/todos", true);
        xhttp.setRequestHeader("x-api-key","3144ca-65eefb-684545-408bc6-a79a27");
        xhttp.send();
    }

    printTodos() {
        // PRINT TODOS
        let todoHTML = [];
        for (let i=0; i<this.state.todosList.length; i++) {
            let todoItem = this.state.todosList[i];
            console.log(todoItem);
            todoHTML.push(
                <Todo loadTodos={this.loadTodos} key={todoItem.id} completed={todoItem.completed} todoItem={todoItem}/>
            );
        }
        return todoHTML;
    }

    sort() {
        let newSort = !this.state.sort;
        this.setState({
            sort: newSort
        })
        this.loadTodos()
    }

    render() {
        return (
            <div className="App">
            <div id="body">
                <h2 className="text-center">Welcome to the Best, Least-Generic ToDo App on the Internet</h2>
                <NewTodo loadTodos={this.loadTodos}/>
                <div id="mainSection">
                    <h3>Your ToDo's</h3>
                    <hr></hr>
                    {
                        !this.state.sort ?
                        <button className="btn btn-sm btn-primary mb-3 mx-auto" onClick={this.sort}>Sort ToDo's Alphabetically</button>
                        :
                        <button className="btn btn-sm btn-secondary mb-3 mx-auto" onClick={this.sort}>Remove Sort</button>
                    }
                    
                    <div id="todoList">
                        {this.printTodos()}
                    </div>
                </div> 
            </div>
            </div>
        );
    }
}

export default App;
