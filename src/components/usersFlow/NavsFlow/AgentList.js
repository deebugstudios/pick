import React, { useContext, useState } from "react";
import "./agentlist.css";
import pickload from "../../Images/pickload.png";
import { useEffect } from "react";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import { DateConverter } from "../../../DateAndTimeConverter";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function AgentList() {
  const [conversations, setConversations] = useState([]);
  const [timeSent, setTimeSent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userValues = useContext(userContext);
  const { token } = userValues;

  const fetchConversations = async () => {
    // console.log(JSON.parse(token));
    const response = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_chat/get_conversations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: JSON.parse(token),
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    setLoading(false);
    setConversations(data?.conversations);
    // setTimeSent(<DateConverter value={data?.conversations.timestamp} />);
    //
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  //   function handleClick() {
  //     alert("success");
  //   }

  const displayData = conversations?.map((user, i) => (
    <div className="shadow-agent-wrapper">
      <div
        className="shadow-agent-container"
        onClick={() => {
          navigate("/user/chatwithagentuser", {
            state: {
              agentId: user?.members[1],
              agentName: user?.other_username,
              agentImg: user?.other_user_img,
            },
          });
        }}
      >
        <div className="shadow-agent-image">
          <img src={user?.other_user_img} />
        </div>
        <div className="shadow-message-info-container">
          <h3>{user?.other_username}</h3>
          <p>
            {" "}
            {user?.latest_message.sender_id == user?.members[1]
              ? `Agent: ${user?.latest_message.content}`
              : `You: ${user?.latest_message.content}`}
          </p>
        </div>
        <div className="shadow-time-of-message">
          <p>{<DateConverter value={user?.timestamp} />}</p>
        </div>
      </div>
    </div>
  ));

  if (loading === true) {
    return (
      <div className="loader-screen">
        <ClipLoader color={"#1AA803"} loading={loading} size={100} />
        <p>Loading...</p>
      </div>
    );
  } else
    return (
      <section className="shadow-agentlist-wrapper">
        <div className="shadow-agentlist-container">
          <h3>Messages</h3>
          {displayData?.length > 0 ? (
            displayData
          ) : (
            <div className="loader-screen">No previous conversations</div>
          )}
        </div>
      </section>
    );
}
