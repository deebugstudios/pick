import React from "react";
import Pickload from "../Images/pickload.png";
import "../css/Head.css";

export default function Head() {
  return (
    <div id="head">
      <div id="pick-div">
        <img src={Pickload} />
      </div>
    </div>
  );
}

export function Head2() {
  return (
    <div id="head2">
      <div id="pick-div">
        <img src={Pickload} />
      </div>
    </div>
  );
}
