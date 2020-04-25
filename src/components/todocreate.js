import React from "react";
import { connect } from "react-redux";
import { doAddTodoWithNotification } from "../state";
import uuid from "uuid/v4";

class TodoCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.onCreateTodo = this.onCreateTodo.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }
  onChangeName(event) {
    this.setState({ value: event.target.value });
  }
  onCreateTodo(event) {
    this.props.onAddTodo(this.state.value);
    this.setState({ value: "" });
    event.preventDefault();
  }
  render() {
    const { value } = this.state;

    return (
      <div>
        <form onSubmit={this.onCreateTodo}>
          <input
            type="text"
            placeholder="Add Todo..."
            value={value}
            onChange={this.onChangeName}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

function mapDispatchToPropsCreate(dispatch) {
  return {
    onAddTodo: (name) => dispatch(doAddTodoWithNotification(uuid(), name))
  };
}

export const ConnectedTodoCreate = connect(
  null,
  mapDispatchToPropsCreate
)(TodoCreate);
