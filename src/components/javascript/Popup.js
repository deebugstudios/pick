import React from "react";
import "../css/popup.css";

export default function Popup(props) {
  return props.trigger ? (
    <div className="nedu-popup">
      <div className="nedu-popup-inner">
        <button
          className="nedu-close-btn"
          onClick={() => props.setTrigger(false)}
        >
          close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export function Popup2(props) {
  return props.trigger ? (
    <div className="nedu-popup">
      <div className="nedu-popup-inner">
        <button
          className="nedu-close-btn"
          onClick={() => props.setTrigger(false)}
        >
          close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
