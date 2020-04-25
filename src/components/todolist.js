import React from "react";
import { connect } from "react-redux";
import { ConnectedTodoItem } from "./todoitem";
import { VISIBILITY_FILTERS } from "./filter";

function TodoList({ todosAsIds }) {
  return (
    <div>
      {todosAsIds.map((todoId) => (
        <ConnectedTodoItem key={todoId} todoId={todoId} />
      ))}
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

//connect arguments
function mapStateToPropsList(state) {
  return {
    todosAsIds: getTodosAsIds(state)
  };
}

//connect views to state in redux store
export const ConnectedTodoList = connect(mapStateToPropsList)(TodoList);
