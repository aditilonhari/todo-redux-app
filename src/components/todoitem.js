import React from "react";
import { connect } from "react-redux";
import { doToggleTodo } from "../state";

function TodoItem({ todo, onToggleTodo }) {
  const { name, id, completed } = todo;
  return (
    <div>
      {name}
      <button type="button" onClick={() => onToggleTodo(id)}>
        {completed ? "Incomplete" : "Complete"}
      </button>
    </div>
  );
}

// selectors
function getTodo(state, todoId) {
  return state.todoState.entities[todoId];
}

//connect arguments
function mapStateToPropsItem(state, props) {
  return {
    todo: getTodo(state, props.todoId)
  };
}
function mapDispatchToPropsItem(dispatch) {
  return {
    onToggleTodo: (id) => dispatch(doToggleTodo(id))
  };
}

//connect views to state in redux store
export const ConnectedTodoItem = connect(
  mapStateToPropsItem,
  mapDispatchToPropsItem
)(TodoItem);
