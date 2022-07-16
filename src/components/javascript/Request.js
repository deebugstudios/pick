import React from "react";

export default function Request(props) {
  return (
    <>
      <div id="mmm">
        <div id="success">
          <h2>{props.pickup}</h2>
          <br />
          <img src={props.jpg} alt="Animal" />
          <br />
          <p id="successText">
            {props.First}
            <br />
            {props.Second}
          </p>
        </div>
        <br />
        <div id="div-button">
          {props.button3} {props.button} {props.button2}
        </div>
      </div>
    </>
  );
}

export function Request2(props) {
  return (
    <>
      <div id="mmm">
        <div id="success2">
          <h2>{props.pickup}</h2>
          <br />
          <img src={props.jpg} alt="Animal" />
          <br />
          <p id="successText">
            {props.First}
            <br />
            {props.Second}
          </p>
        </div>
        <br />
        <div id="div-button">
          {props.button3} {props.button} {props.button2}
        </div>
      </div>
    </>
  );
}
