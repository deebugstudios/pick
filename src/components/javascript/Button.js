import React from "react";
import "../css/button.css";
// import { Link } from "react-router-dom";

export default function Button(props) {
  return (
    <button id="compButton" type={props.type} onClick={props.click} disabled={props.loading}>
      <span>{props.name}</span>
    </button>
  );
}

export function Button2(props) {
  return (
    <button id="compButton2" type={props.type} disabled={props.loading}>
      <span>{props.name}</span>
    </button>
  );
}

export function Button3(props) {
  return (
    <button id="compButton3" type={props.type} onClick={props.click} disabled={props.loading}>
      <span>{props.name}</span>
    </button>
  );
}

export function Button4(props) {
  return (
    <button id="compButton4" type={props.type} disabled={props.loading}>
      <span>{props.name}</span>
    </button>
  );
}
