import React from "react";
import "../../css/chatpage.css";

export default function () {
  return (
    <div className="main-chat-div">
      <h2>Chat Messages</h2>

      <div className="chat-flex">
        <div className="container-chat lighter">
          <p>Hello. How are you today?</p>
          <span className="time-right">11:00</span>
        </div>

        <div>
          <div className="container-chat darker">
            <p>
              Hey! I'm fine. Thanks for asking!
              ........................................................................................................................................................................................
            </p>
            <span className="time-left">11:01</span>
          </div>
          <span className="time-left">sent</span>
        </div>

        <div className="container-chat lighter">
          <p>Sweet! So, what do you wanna do today?</p>
          <span className="time-right">11:02</span>
        </div>

        <div className="container-chat darker">
          <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
          <span className="time-left">11:05</span>
        </div>
      </div>
    </div>
  );
}
