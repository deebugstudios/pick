import React from "react";
import Button from "../javascript/Button";
import { Link } from "react-router-dom";

export default function Message() {
  return (
    <div>
      <h1>Both Individual and Fleet Signup pages look alike</h1>
      <Link to="/userflow">
        <Button name="Next" />
      </Link>
    </div>
  );
}
