import React, { useEffect } from "react";
import Animal from "../Images/animal.png";
import Button from "../javascript/Button";
import "../css/Success.css";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../utils/firebase";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    increase();
  }, []);

  const increase = async () => {
    const notifyRef = doc(db, "admin_notifiers", "agent_applications");
    await updateDoc(notifyRef, {
      applications_count: increment(1),
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate("/welcome-agent");
  };
  return (
    <>
      <div id="mmm">
        <div id="success">
          <h2>Account Creation Successful</h2>
          <div>
            <img src={Animal} alt="Animal" />
          </div>
          <p id="successText">
            Congratulations, your account has been created successfully.
            <br />
            Your account will be approved by the Admin shortly.
          </p>
        </div>
        <br />

        <Button name="Login" click={handleClick} />
      </div>
    </>
  );
}
