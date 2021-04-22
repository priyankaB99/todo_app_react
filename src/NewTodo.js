import React, { Component } from 'react';
import './Todo.css';

class NewTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoInput : ""
        };
        this.addTodo = this.addTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    addTodo(event) {
        event.preventDefault();
        event.persist();
        let newTodo = this.state.todoInput;

        let currentComponent = this;

        // Setting variable for form input
        var data = {
            text: newTodo
        };

        // Initalize AJAX Request
        var xhttp2 = new XMLHttpRequest();
        // Response handler
        xhttp2.onreadystatechange = function() {
            // Wait for readyState = 4 & 200 response
            if (this.readyState === 4 && this.status === 200) {
                // parse JSON response
                var todo = JSON.parse(this.responseText);
                currentComponent.setState({
                    todoInput : ""
                })
                currentComponent.props.loadTodos();
            } else if (this.readyState === 4) {
                // this.status !== 200, error from server
                console.log("post error", this);
            }
        };
        xhttp2.open("POST", "https://cse204.work/todos", true);
        xhttp2.setRequestHeader("Content-type", "application/json");
        xhttp2.setRequestHeader("x-api-key", '3144ca-65eefb-684545-408bc6-a79a27');
        xhttp2.send(JSON.stringify(data));
    }

    render() {
    return (
        <form id="addForm" onSubmit={this.addTodo}>
            <div className="form-group">
                <label htmlFor="newTodoInput">Add To Do Item</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="newTodoInput" 
                    name="todoInput" 
                    onChange={this.handleChange} 
                    placeholder="Enter To Do" 
                    value={this.state.todoInput}>
                </input>
            </div>
            <button 
                type="submit" 
                id="addTodoButton" 
                className="btn btn-primary"
                >
                    Add
            </button>
        </form>
    );
    }
}

export default NewTodo;