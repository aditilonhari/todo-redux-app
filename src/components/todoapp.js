import React from "react";
import { ConnectedTodoCreate } from "./todocreate";
import { ConnectedTodoList } from "./todolist";
import { ConnectedNotifications } from "./notifications";
import { ConnectedFilter } from "./filter";

export function TodoApp() {
  return (
    <div>
      <ConnectedFilter />
      <ConnectedTodoCreate />
      <ConnectedTodoList />
      <ConnectedNotifications />
    </div>
  );
}
