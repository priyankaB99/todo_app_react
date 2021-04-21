import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="body">
            <h2 className="text-center">Welcome to the Best, Least-Generic ToDo App on the Internet</h2>
            <NewTodo />
            <div id="mainSection">
                <h3>Your ToDo's</h3>
                <hr></hr>
                <div id="todoList">
                    <Todo />
                </div>
            </div> 
        </div>
      </div>
    );
  }
}

export default App;
