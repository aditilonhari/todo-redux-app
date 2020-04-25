import React from "react";
import { connect } from "react-redux";
import { doSetFilter } from "../state";

function Filter({ onSetFilter }) {
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

function mapDispatchToPropsFilter(dispatch) {
  return {
    onSetFilter: (filterType) => dispatch(doSetFilter(filterType))
  };
}
export const ConnectedFilter = connect(null, mapDispatchToPropsFilter)(Filter);
