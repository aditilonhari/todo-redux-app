import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import { schema, normalize } from "normalizr";

// action types
const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";

// reducers
const todos = [
  { id: "1", name: "Redux Standalone with advanced Actions" },
  { id: "2", name: "Redux Standalone with advanced Reducers" },
  { id: "3", name: "Bootstrap App with Redux" },
  { id: "4", name: "Naive Todo with React and Redux" },
  { id: "5", name: "Sophisticated Todo with React and Redux" },
  { id: "6", name: "Connecting State Everywhere" },
  { id: "7", name: "Todo with advanced Redux" },
  { id: "8", name: "Todo but more Features" },
  { id: "9", name: "Todo with Notifications" },
  { id: "10", name: "Hacker News with Redux" }
];

function todoReducer(state = initialTodoState, action) {
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
  const todo = { ...action.todo, completed: false };
  const entities = { ...state.entities, [todo.id]: todo };
  const ids = [...state.ids, action.todo.id];
  return { ...state, entities, ids };
}
function applyToggleTodo(state, action) {
  const id = action.todo.id;
  const todo = state.entities[id];
  const toggledTodo = { ...todo, completed: !todo.completed };
  const entities = { ...state.entities, [id]: toggledTodo };
  return { ...state, entities };
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

// schemas
const todoSchema = new schema.Entity("todo");
const normalizedTodos = normalize(todos, [todoSchema]);
console.log(normalizedTodos);
const initialTodoState = {
  entities: normalizedTodos.entities.todo,
  ids: normalizedTodos.result
};

// action creators
export function doAddTodo(id, name) {
  return {
    type: TODO_ADD,
    todo: { id, name }
  };
}
export function doToggleTodo(id) {
  return {
    type: TODO_TOGGLE,
    todo: { id }
  };
}
export function doSetFilter(filter) {
  return {
    type: FILTER_SET,
    filter
  };
}

// store
const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer
});
const logger = createLogger();
export const Store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(logger)
);
