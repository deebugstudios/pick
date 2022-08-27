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
            navigate("/user/completed-del");
          }}
        >
          Okay
        </button>
      </div>
    </>
  );
}
