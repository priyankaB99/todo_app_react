import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {

  render() {
    let checked = "checked";
    let classString = "true";
    return (
      <div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="checkbox" name="todoItem" className={classString}>
                    </input>
                </div>
            </div>
            <label for="todoItem" class="form-check-label todoItem"> finish todo app</label>
            <span class="close">X</span><br></br>
        </div>
      </div>
    );
  }
}

export default Todo;