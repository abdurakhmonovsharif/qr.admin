import React, { useRef, useEffect } from "react";
import "../../assets/styles/popup.css";

const Popover = ({ x, y, visible }) => {
  return (
    visible && (
      <ul style={{ left: `${x}px`, top: `${y}px` }} className="popup">
        <li>Edit</li>
        <li>Delete</li>
      </ul>
    )
  );
};

export default Popover;
