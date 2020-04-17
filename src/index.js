import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";
import { Provider, connect } from "react-redux";
import "./index.css";

// action types
const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";

// reducers
const todos = [
  { id: "0", name: "learn redux" },
  { id: "1", name: "learn mobx" },
];
function todoReducer(state = todos, action) {
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, action);
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action);
    }
    default:
      return state;
  }
}
function applyAddTodo(state, action) {
  const todo = Object.assign({}, action.todo, { completed: false });
  return state.concat(todo);
}
function applyToggleTodo(state, action) {
  return state.map((todo) =>
    todo.id === action.todo.id
      ? Object.assign({}, todo, { completed: !todo.completed })
      : todo
  );
}
function filterReducer(state = "SHOW_ALL", action) {
  switch (action.type) {
    case FILTER_SET: {
      return applySetFilter(state, action);
    }
    default:
      return state;
  }
}
function applySetFilter(state, action) {
  return action.filter;
}

// action creators
function doAddTodo(id, name) {
  return {
    type: TODO_ADD,
    todo: { id, name },
  };
}
function doToggleTodo(id) {
  return {
    type: TODO_TOGGLE,
    todo: { id },
  };
}
function doSetFilter(filter) {
  return {
    type: FILTER_SET,
    filter,
  };
}

// store
const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
});
const store = createStore(rootReducer);

// view layer

function TodoApp() {
  return <ConnectedTodoList />;
}
function TodoList({ todos }) {
  return (
    <div>
      {todos.map((todo) => (
        <ConnectedTodoItem key={todo.id} todo={todo} />
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

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <TodoApp />
    </Provider>,
    document.getElementById("root")
  );
}
function mapStateToProps(state) {
  return {
    todos: state.todoState,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onToggleTodo: (id) => dispatch(doToggleTodo(id)),
  };
}
const ConnectedTodoList = connect(mapStateToProps)(TodoList);
const ConnectedTodoItem = connect(null, mapDispatchToProps)(TodoItem);

render();
