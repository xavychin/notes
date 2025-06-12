import React from "react";
import "../style/header.css";

function header() {
  const now = new Date();

  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const date = now.toLocaleDateString("en-US");
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="grid-header-container">
      <h2 className="header-title">~TO DO LIST~</h2>
      <div className="header-date">
        <h4>{day + ", " + date}</h4>
        <h4>{time}</h4>
      </div>
    </div>
  );
}

export default header;
