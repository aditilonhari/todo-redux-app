import React from "react";
import { connect } from "react-redux";
import { doToggleTodo } from "../state";

export function TodoApp() {
  return <ConnectedTodoList />;
}

function TodoList({ todosAsIds }) {
  return (
    <div>
      {todosAsIds.map((todoId) => (
        <ConnectedTodoItem key={todoId} todoId={todoId} />
      ))}
    </div>
  );
}

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
function getTodosAsIds(state) {
  return state.todoState.ids;
}
function getTodo(state, todoId) {
  return state.todoState.entities[todoId];
}

//connect arguments
function mapStateToPropsList(state) {
  return {
    todosAsIds: getTodosAsIds(state)
  };
}
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
const ConnectedTodoList = connect(mapStateToPropsList)(TodoList);
const ConnectedTodoItem = connect(
  mapStateToPropsItem,
  mapDispatchToPropsItem
)(TodoItem);
