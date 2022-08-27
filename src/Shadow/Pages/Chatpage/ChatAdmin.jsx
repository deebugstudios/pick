import React from "react";
import { ProfilePix } from "../Details info/ProfilePix";
import report from "../../images/reportflag.png";
import attachmenticon from "../../images/attachfileicon.png";
import sendicon from "../../images/sendicon.png";
import "./chatadmin.css";
import LoggedinMainPage from "../../../components/usersFlow/NavsFlow/LoggedinMainPage";
const ChatAdmin = () => {
  return (
    <section className="user-dashboard chat-admin">
      <div className="chat-wrapper">
        <div className="chat-left-side">
          <div className="chat-left-side-top">
            <h5>New (4)</h5>
            <div className="Chat-profile">
              <div>
                <ProfilePix />
              </div>
              <div className="chat-report">
                <p className="time-of-msg">now</p>
                {/* <img src={report} alt="report flag" /> */}
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras.
              </p>
              <p className="no-of-messages">4</p>
            </div>
            <div className="Chat-profile active-chat">
              <ProfilePix />
              <div className="chat-report">
                <p className="time-of-msg">3 mins ago</p>
                <img src={report} alt="report flag" />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras.
              </p>
              <p className="no-of-messages">1</p>
            </div>
          </div>
          <div className="chat-left-side-bottom">
            <h5>RESOLVED (16)</h5>
            <div className="resovled-chat chat-margin">
              <p>1:32 PM 04/20</p>
              <ProfilePix />
            </div>
            <div className="resovled-chat chat-margin">
              <p>1:32 PM 04/20</p>
              <ProfilePix />
            </div>
            <div className="resovled-chat chat-margin">
              <p>1:32 PM 04/20</p>
              <ProfilePix />
            </div>
            <div className="resovled-chat chat-margin">
              <p>1:32 PM 04/20</p>
              <ProfilePix />
            </div>
          </div>
        </div>
        <div className="chat-right-side">
          <div className="your-profile">
            <h3>Andrew Olatunji</h3>
            <h6>andrewtunji@gmail.com</h6>
          </div>
          <div className="message-header">
            <h6>
              Conversations <img src={report} alt="report flag" />{" "}
            </h6>
          </div>
          <div className="messages-wrapper">
            <p className="date-of-msg">TODAY MARCH 23</p>
            <div className="incoming-msgs">
              <p>I am reporting Delivery “ID 879709” for “Item Seal Broken”</p>
              <p>
                Good afternoon Andrew, your report has been recorded and would
                be reviewed by the admin.
              </p>
              <p>hi</p>
            </div>
            <div className="outgoing-msgs">
              <p>Hi, good afternoon</p>
              <p>Typing...</p>
              <p>hi</p>
            </div>
            <div className="incoming-msgs">
              <p>I am reporting Delivery “ID 879709” for “Item Seal Broken”</p>
              <p>
                Good afternoon Andrew, your report has been recorded and would
                be reviewed by the admin.
              </p>
              <p>hi</p>
            </div>
            <div className="outgoing-msgs">
              <p>Hi, good afternoon</p>
              <p>Typing...</p>
              <p>hi</p>
            </div>
            <div className="incoming-msgs">
              <p>I am reporting Delivery “ID 879709” for “Item Seal Broken”</p>
              <p>
                Good afternoon Andrew, your report has been recorded and would
                be reviewed by the admin.
              </p>
              <p>hi</p>
            </div>
            <div className="chat-section">
              <div className="typing-bar">
                <input type="text" placeholder="Type your message here" />
              </div>
              <div className="chat-icons">
                <div className="attachment">
                  <img src={attachmenticon} alt="" />
                </div>
                <div className="send-message">
                  <img src={sendicon} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ChatAdmin;

export function UserChatAdmin() {
  return (
    <section className="user-dashboard chat-admin">
      <div className="chat-wrapper">
        <div className="chat-left-side">
          <div className="chat-left-side-top">
            <h5>New (4)</h5>
            <div className="Chat-profile">
              <div>
                <ProfilePix />
              </div>
              <div className="chat-report">
                <p className="time-of-msg">now</p>
                {/* <img src={report} alt="report flag" /> */}
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras.
              </p>
              <p className="no-of-messages">4</p>
            </div>
            <div className="Chat-profile active-chat">
              <ProfilePix />
              <div className="chat-report">
                <p className="time-of-msg">3 mins ago</p>
                <img src={report} alt="report flag" />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras.
              </p>
              <p className="no-of-messages">1</p>
            </div>
          </div>
          <div className="chat-left-side-bottom">
            <h5>RESOLVED (16)</h5>
            <div className="resovled-chat chat-margin">
              <p>1:32 PM 04/20</p>
              <ProfilePix />
            </div>
            <div className="resovled-chat chat-margin">
              <p>1:32 PM 04/20</p>
              <ProfilePix />
            </div>
            <div className="resovled-chat chat-margin">
              <p>1:32 PM 04/20</p>
              <ProfilePix />
            </div>
            <div className="resovled-chat chat-margin">
              <p>1:32 PM 04/20</p>
              <ProfilePix />
            </div>
          </div>
        </div>
        <div className="chat-right-side">
          <div className="your-profile">
            <h3>Andrew Olatunji</h3>
            <h6>andrewtunji@gmail.com</h6>
          </div>
          <div className="message-header">
            <h6>
              Conversations <img src={report} alt="report flag" />{" "}
            </h6>
          </div>
          <div className="messages-wrapper">
            <p className="date-of-msg">TODAY MARCH 23</p>
            <div className="incoming-msgs">
              <p>I am reporting Delivery “ID 879709” for “Item Seal Broken”</p>
              <p>
                Good afternoon Andrew, your report has been recorded and would
                be reviewed by the admin.
              </p>
              <p>hi</p>
            </div>
            <div className="outgoing-msgs">
              <p>Hi, good afternoon</p>
              <p>Typing...</p>
              <p>hi</p>
            </div>
            <div className="incoming-msgs">
              <p>I am reporting Delivery “ID 879709” for “Item Seal Broken”</p>
              <p>
                Good afternoon Andrew, your report has been recorded and would
                be reviewed by the admin.
              </p>
              <p>hi</p>
            </div>
            <div className="outgoing-msgs">
              <p>Hi, good afternoon</p>
              <p>Typing...</p>
              <p>hi</p>
            </div>
            <div className="incoming-msgs">
              <p>I am reporting Delivery “ID 879709” for “Item Seal Broken”</p>
              <p>
                Good afternoon Andrew, your report has been recorded and would
                be reviewed by the admin.
              </p>
              <p>hi</p>
            </div>
            <div className="chat-section">
              <div className="typing-bar">
                <input type="text" placeholder="Type your message here" />
              </div>
              <div className="chat-icons">
                <div className="attachment">
                  <img src={attachmenticon} alt="" />
                </div>
                <div className="send-message">
                  <img src={sendicon} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
