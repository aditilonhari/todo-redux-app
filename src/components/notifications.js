import React from "react";

export function Notifications({ notifications }) {
  return (
    <div>
      {notifications.map((note) => (
        <div key={note}>{note}</div>
      ))}
    </div>
  );
}
