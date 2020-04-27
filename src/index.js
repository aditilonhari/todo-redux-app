import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { Store } from "./state";
import { TodoApp } from "./components/todoapp";
import "./index.css";

// view layer
function render() {
  ReactDOM.render(
    <Provider store={Store}>
      <TodoApp />
    </Provider>,
    document.getElementById("root")
  );
  serviceWorker.unregister();
}
render();
