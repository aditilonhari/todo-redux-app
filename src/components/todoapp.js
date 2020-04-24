import React from "react";
import { connect } from "react-redux";
import { doToggleTodo, doAddTodo, doSetFilter } from "../state";
import { TodoCreate } from "./todocreate";
import { Filter, VISIBILITY_FILTERS } from "./filter";
import uuid from "uuid/v4";

export function TodoApp() {
  return (
    <div>
      <ConnectedFilter />
      <ConnectedTodoCreate />
      <ConnectedTodoList />
    </div>
  );
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
  return state.todoState.ids
    .map((id) => state.todoState.entities[id])
    .filter(VISIBILITY_FILTERS[state.filterState])
    .map((todo) => todo.id);
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
function mapDispatchToPropsCreate(dispatch) {
  return {
    onAddTodo: (name) => dispatch(doAddTodo(uuid(), name))
  };
}
function mapDispatchToPropsFilter(dispatch) {
  return {
    onSetFilter: (filterType) => dispatch(doSetFilter(filterType))
  };
}

//connect views to state in redux store
const ConnectedTodoList = connect(mapStateToPropsList)(TodoList);
const ConnectedTodoItem = connect(
  mapStateToPropsItem,
  mapDispatchToPropsItem
)(TodoItem);
const ConnectedTodoCreate = connect(null, mapDispatchToPropsCreate)(TodoCreate);
const ConnectedFilter = connect(null, mapDispatchToPropsFilter)(Filter);
