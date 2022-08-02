import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Thanks.css";

export default function Thanks(props) {
  const navigate = useNavigate();
  return (
    <>
      <div id="thanks-div">
        <p>
          {props.First} <br /> {props.Second}
        </p>
        <br />

        <button
          onClick={() => {
            navigate("/pending-del");
          }}
        >
          Okay
        </button>
      </div>
    </>
  );
}
