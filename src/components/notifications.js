import React from "react";
import { connect } from "react-redux";

function Notifications({ notifications }) {
  return (
    <div>
      {notifications.map((note) => (
        <div key={note}>{note}</div>
      ))}
    </div>
  );
}

//selectors
function getNotifications(state) {
  return getArrayOfObject(state.notificationState);
}
function getArrayOfObject(object) {
  return Object.keys(object).map((key) => object[key]);
}

function mapStateToPropsNotifications(state, props) {
  return {
    notifications: getNotifications(state)
  };
}

export const ConnectedNotifications = connect(mapStateToPropsNotifications)(
  Notifications
);
