import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import { schema, normalize } from "normalizr";
import createSagaMiddleware from "redux-saga";
import { put, takeEvery, delay } from "redux-saga/effects";

// action types
const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";
const NOTIFICATION_HIDE = "NOTIFICATION_HIDE";
const TODO_ADD_WITH_NOTIFICATION = "TODO_ADD_WITH_NOTIFICATION";

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

//TODO REDUCER
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

//FILTER REDUCER
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

//NOTIFICATION REDUCER
function notificationReducer(state = {}, action) {
  switch (action.type) {
    case TODO_ADD: {
      return applySetNotifyAboutAddTodo(state, action);
    }
    case NOTIFICATION_HIDE: {
      return applyRemoveNotification(state, action);
    }
    default:
      return state;
  }
}

function applySetNotifyAboutAddTodo(state, action) {
  const { name, id } = action.todo;
  return { ...state, [id]: "Todo Created: " + name };
}
function applyRemoveNotification(state, action) {
  const { [action.id]: notificationToRemove, ...restNotifications } = state;
  return restNotifications;
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
export function doAddTodoWithNotification(id, name) {
  return {
    type: TODO_ADD_WITH_NOTIFICATION,
    todo: { id, name }
  };
}

// store
const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
  notificationState: notificationReducer
});
const logger = createLogger();
const saga = createSagaMiddleware();
export const Store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(saga, logger)
);
saga.run(watchAddTodoWithNotification);

// sagas
function* watchAddTodoWithNotification() {
  yield takeEvery(TODO_ADD_WITH_NOTIFICATION, handleAddTodoWithNotification);
}
function* handleAddTodoWithNotification(action) {
  const { todo } = action;
  const { id, name } = todo;
  yield put(doAddTodo(id, name));
  yield delay(5000);
  yield put(doHideNotification(id));
}
function doHideNotification(id) {
  return {
    type: NOTIFICATION_HIDE,
    id
  };
}
