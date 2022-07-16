import React from "react";
import "../css/Thanks.css";

export default function Thanks(props) {
  return (
    <>
      <div id="thanks-div">
        <p>
          {props.First} <br /> {props.Second}
        </p>
        <br />

        <button>Okay</button>
      </div>
    </>
  );
}
