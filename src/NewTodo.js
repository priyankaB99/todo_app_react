import React, { Component } from 'react';
import './Todo.css';

class NewTodo extends Component {
  render() {
    return (
        <form id="addForm">
            <div className="form-group">
                <label for="newTodoInput">Add To Do Item</label>
                <input type="text" className="form-control" id="newTodoInput" placeholder="Enter To Do"></input>
            </div>
            <button type="submit" id="addTodoButton" className="btn btn-primary">Add</button>
        </form>
    );
  }
}

export default NewTodo;