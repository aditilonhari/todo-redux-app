import React from "react";

export function Filter({ onSetFilter }) {
  return (
    <div>
      Show
      <button type="button" onClick={() => onSetFilter("SHOW_ALL")}>
        All
      </button>
      <button type="button" onClick={() => onSetFilter("SHOW_COMPLETED")}>
        Completed
      </button>
      <button type="button" onClick={() => onSetFilter("SHOW_INCOMPLETED")}>
        Incompleted
      </button>
    </div>
  );
}

// filters
export const VISIBILITY_FILTERS = {
  SHOW_COMPLETED: (item) => !item.completed,
  SHOW_INCOMPLETED: (item) => item.completed,
  SHOW_ALL: (item) => true
};
