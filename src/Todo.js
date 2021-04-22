import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: this.props.completed,
            text: this.props.todoItem.text,
            todoId: this.props.todoItem.id
        };
        this.completeTodo = this.completeTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    deleteTodo(event) {
        event.preventDefault();
        event.persist();
        console.log("d", event.target.classList[1]);

        let currentComponent = this;

        // Setting variable for ToDo id
        var id = event.target.classList[1];
        // Initalize AJAX Request
        var xhttp2 = new XMLHttpRequest();
        // Response handler
        xhttp2.onreadystatechange = function() {
            // Wait for readyState = 4 & 200 response
            if (this.readyState === 4 && this.status === 200) {
                // parse JSON response
                currentComponent.props.loadTodos()
            } else if (this.readyState === 4) {
                // this.status !== 200, error from server
                console.log(this);
            }
        };
        xhttp2.open("DELETE", "https://cse204.work/todos/"+id, true);
    
        xhttp2.setRequestHeader("Content-type", "application/json");
        xhttp2.setRequestHeader("x-api-key", "3144ca-65eefb-684545-408bc6-a79a27");
        xhttp2.send();
    }

    completeTodo(event) {
        event.preventDefault();
        event.persist();
        console.log("event", event);

        let currentComponent = this;

        var id = event.target.classList[0];
        var newCompleted;
        if (event.target.classList[1] === "true") {
            newCompleted = false;
        }
        else {
            newCompleted = true;
        }
        console.log("New completion", newCompleted)

        // Setting variable for form input
        var data = {
            completed: newCompleted
        }
        console.log(JSON.stringify(data));

        // Initalize AJAX Request
        var xhttp2 = new XMLHttpRequest();
        // Response handler
        xhttp2.onreadystatechange = function() {
            // Wait for readyState = 4 & 200 response
            if (this.readyState === 4 && this.status === 200) {
                currentComponent.props.loadTodos();
                // currentComponent.setState({
                //     completed: newCompleted
                // })
            } else if (this.readyState === 4) {
                // this.status !== 200, error from server
                console.log("put error", this);
            }
        };
        xhttp2.open("PUT", "https://cse204.work/todos/"+id, true);
        xhttp2.setRequestHeader("Content-type", "application/json");
        xhttp2.setRequestHeader("x-api-key", '3144ca-65eefb-684545-408bc6-a79a27');
        xhttp2.send(JSON.stringify(data));
    }

    render() {
        let done;
        let checked;
        console.log("PRINT ITEM", this.state.completed)
        if (this.props.completed) {
            checked = " checked"
            done = " true "
            // checkbox = (<input type="checkbox" checked className={this.state.todoId + " true"} name={todoName} onChange={this.completeTodo}></input>);
        }
        else {
            checked = "";
            done = " false "
            // checkbox = (<input type="checkbox" className={this.state.todoId + " false"} name={todoName} onChange={this.completeTodo}></input>);
        }
        return (
            <div>
                <div className="input-group mb-3">
                    <div className="todoWrapper">
                        <h6 className={this.state.todoId + done + "form-check-label todoItem" + checked} onClick={this.completeTodo}> {this.state.text}</h6>
                    </div>   
                    <span className={"close " + this.state.todoId} onClick={this.deleteTodo}>X</span><br></br>
                </div>
            </div>
        );
        }
}

export default Todo;