import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Store } from "./state";
import { TodoApp } from "./components/todoapp";
import "./index.css";

// view layer
render(
  <Provider store={Store}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
