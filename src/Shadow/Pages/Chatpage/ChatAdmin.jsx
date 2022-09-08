import React, { useContext, useState } from "react";
import { ProfilePix } from "../Details info/ProfilePix";
import report from "../../images/reportflag.png";
import attachmenticon from "../../images/attachfileicon.png";
import sendicon from "../../images/sendicon.png";
import "./chatadmin.css";
import LoggedinMainPage from "../../../components/usersFlow/NavsFlow/LoggedinMainPage";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
  getDocs,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { DateConverter } from "../../../DateAndTimeConverter";
import { useRef } from "react";
import { userContext } from "../Contexts/RiderContext";

export default function UserChatAdmin() {
  const location = useLocation();
  const agentId = location.state.agentId;
  const agentName = location.state.agentName;
  const [isLoaded, setIsLoaded] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [userId, setUserId] = useState("");
  const bottomRef = useRef(null);
  const [convId, setConvId] = useState("");
  const [content, setContent] = useState("");
  const [conversations, setConversations] = useState([]);
  const [new_conv, setNew_conv] = useState(undefined);
  const userValues = useContext(userContext);
  const { token } = userValues;

  const fetchUserDetails = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_profile/user_profile",
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
    const data = await res.json();
    // setLoading(false);
    setUserDetails(data?.user);
    setUserName(data?.user.fullname);
    setUserImg(data?.user.img);
    setUserId(data?.user._id);
  };

  const fetchConversations = async () => {
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
    setConversations(data?.conversations);
    //
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content === "") {
      return;
    }
    if (new_conv === true || convId === "a") {
      const contentToDB = content;
      setContent("");
      // console.log;
      try {
        const res = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/user_chat/send_message",
          {
            method: "POST",
            body: JSON.stringify({
              token: JSON.parse(token),
              receiver_id: agentId,
              sender_name: userName,
              new_conv: true,
              sender_img: userImg,
              content: contentToDB,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.msg === "Message sent") {
          setConvId(data.message.conversation_id);
          setNew_conv(false);
        }
        await setDoc(
          doc(db, "messages_collection", convId, convId, `${Date.now()}`),
          {
            content: contentToDB,
            conv_id: convId,
            receiver_id: agentId,
            sender_id: userId,
            sender_img: userImg,
            sender_name: userName,
            timestamp: Date.now(),
          }
        );
      } catch (error) {
        console.log(error);
        // const err = error
      }
    } else {
      const contentToDB = content;
      // const timestamp = Date.now()
      setContent("");
      await setDoc(
        doc(db, "messages_collection", convId, convId, `${Date.now()}`),
        {
          content: contentToDB,
          conv_id: convId,
          receiver_id: agentId,
          sender_id: userId,
          sender_img: userImg,
          sender_name: userName,
          timestamp: Date.now(),
        }
      );
      await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_chat/send_message",
        {
          method: "POST",
          body: JSON.stringify({
            token: JSON.parse(token),
            receiver_id: agentId,
            sender_name: userName,
            new_conv: false,
            sender_img: userImg,
            content: contentToDB,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
    }
  };
  // console.log(conversations);

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleCheck = async () => {
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_chat/check_convers",
        {
          method: "POST",
          body: JSON.stringify({
            token: JSON.parse(token),
            receiver_id: agentId,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.msg === "Success") {
        setConvId(data.conversation_id);
        setIsLoaded(true);
        setNew_conv(false);
      } else if (data.msg === "No conversation found") {
        setConvId("a");
        setNew_conv(true);
        // setIsLoaded(true);
        // setIsLoaded(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const q = query(collection(db, "messages_collection", convId, convId));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const list = [];
      QuerySnapshot.forEach((doc) => {
        list.push(doc?.data());
        setMessageList(list);
      });
    });
    // console.log(messageList);
    if (isLoaded === false) {
      unsubscribe();
    }
  }, [isLoaded === true]);

  useEffect(() => {
    handleCheck();
    fetchUserDetails();
    fetchConversations();
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  if (convId === "a") {
    return (
      <section className="user-dashboard chat-admin">
        <div className="chat-wrapper">
          <div className="chat-left-side">
            <div className="chat-left-side-top">
              <h5>New (4)</h5>
              {conversations.length > 0
                ? conversations?.map((item) => (
                    <div
                      className="Chat-profile active-chat"
                      onClick={() => {
                        setConvId(item._id);
                      }}
                    >
                      <ProfilePix
                        profileimage={item.other_user_img}
                        name={item.other_username}
                      />
                      <div className="chat-report">
                        <p className="time-of-msg">
                          {<DateConverter value={item.timestamp} />}
                        </p>
                        {/* <img src={report} alt="report flag" /> */}
                      </div>
                      <p>{item.latest_message.content}</p>
                      <p className="no-of-messages">
                        {item.latest_message.sender_id === agentId
                          ? "Agent"
                          : "You"}
                      </p>
                    </div>
                  ))
                : "No Conversations found"}
            </div>
          </div>
          <div className="chat-right-side">
            <div className="your-profile">
              <h3>{agentName}</h3>
            </div>
            <div className="message-header">
              <h6>Conversations</h6>
            </div>
            <div className="messages-wrapper">No messages to display</div>
            <form className="chat-section" onSubmit={handleSubmit}>
              <div className="typing-bar">
                <textarea
                  type="text"
                  placeholder="Type your message here"
                  className="phone-input3"
                  value={content}
                  onChange={handleContent}
                />
              </div>
              <div className="chat-icons ">
                <div className="attachment">
                  <img src={attachmenticon} alt="" />
                </div>
                <button className="send-message">
                  <img src={sendicon} alt="" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  } else if (convId.length > 1)
    return (
      <section className="user-dashboard chat-admin">
        <div className="chat-wrapper">
          <div className="chat-left-side">
            <div className="chat-left-side-top">
              <h5>Other Conversations</h5>
              {conversations.length > 0
                ? conversations?.map((item) => (
                    <div
                      className="Chat-profile active-chat"
                      onClick={() => {
                        setConvId(item._id);
                      }}
                    >
                      <ProfilePix
                        profileimage={item.other_user_img}
                        name={item.other_username}
                      />
                      <div className="chat-report">
                        <p className="time-of-msg">
                          {<DateConverter value={item.timestamp} />}
                        </p>
                        {/* <img src={report} alt="report flag" /> */}
                      </div>
                      <p>{item.latest_message.content}</p>
                      <p className="no-of-messages">
                        {item.latest_message.sender_id === agentId
                          ? "Agent"
                          : "You"}
                      </p>
                    </div>
                  ))
                : "No Conversations found"}
            </div>
            {/* <div className="chat-left-side-bottom">
              <h5>RESOLVED (16)</h5>
              <div className="resovled-chat chat-margin">
                <p>1:32 PM 04/20</p>
                <ProfilePix />
              </div>
            </div> */}
          </div>

          <div className="chat-right-side">
            <div className="your-profile">
              <h3>{agentName}</h3>
            </div>
            <div className="message-header">
              <h6>Conversations</h6>
            </div>
            <div className="messages-wrapper">
              <p className="date-of-msg"></p>
              {messageList?.map((item) =>
                item?.sender_id == agentId ? (
                  <div className="incoming-msgs">
                    <p>{item?.content}</p>
                  </div>
                ) : (
                  <div className="outgoing-msgs">
                    <p>{item?.content}</p>
                  </div>
                )
              )}
              <div ref={bottomRef} />
              <form className="chat-section" onSubmit={handleSubmit}>
                <div className="typing-bar">
                  <textarea
                    type="text"
                    placeholder="Type your message here"
                    className="phone-input3"
                    value={content}
                    onChange={handleContent}
                  />
                </div>
                <div className="chat-icons ">
                  <div className="attachment">
                    <img src={attachmenticon} alt="" />
                  </div>
                  <button className="send-message">
                    <img src={sendicon} alt="" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
}

//Chat with Admin

export const ChatAdmin = () => {
  const location = useLocation();
  // const agentId = location.state.agentId;
  // const agentName = location.state.agentName;
  const [isLoaded, setIsLoaded] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [userId, setUserId] = useState("");
  const bottomRef = useRef(null);
  const [convId, setConvId] = useState("");
  const [content, setContent] = useState("");
  const [conversations, setConversations] = useState([]);
  const [new_conv, setNew_conv] = useState(undefined);
  const userValues = useContext(userContext);
  const { token } = userValues;

  const handleCheck = async () => {
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/help_feedback/check_convers",
        {
          method: "POST",
          body: JSON.stringify({
            token: JSON.parse(token),
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.msg === "Old conversation") {
        setConvId(data.conversation_id);
        setIsLoaded(true);
        setNew_conv(false);
      } else if (data.msg === "No conversation found") {
        setConvId("a");
        setNew_conv(true);
        setIsLoaded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const fetchUserDetails = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_profile/user_profile",
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
    const data = await res.json();
    // setLoading(false);
    setUserDetails(data?.user);
    setUserName(data?.user.fullname);
    setUserImg(data?.user.img);
    setUserId(data?.user._id);
  };

  const fetchConversations = async () => {
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
    setConversations(data?.conversations);
    //
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content === "") {
      return;
    }
    if (new_conv === true || convId === "a") {
      const contentToDB = content;
      setContent("");
      // console.log(userImg, userName, userId, contentToDB);
      try {
        const res = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/help_feedback/send_message",
          {
            method: "POST",
            body: JSON.stringify({
              token: JSON.parse(token),
              sender_name: userName,
              sender_img: userImg,
              new_conv: true,
              content: contentToDB,
              who_sent: "user",
              which_user: "user",
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.msg === "Message sent") {
          setConvId(data.message.conversation_id);
          setNew_conv(false);
        }
        await setDoc(
          doc(db, "hf_collection", convId, convId, `${Date.now()}`),
          {
            content: contentToDB,
            // conv_id: convId,
            sender_id: userId,
            sender_img: userImg,
            sender_name: userName,
            timestamp: Date.now(),
            which_user: "user",
            who_sent: "user",
          }
        );
      } catch (error) {
        console.log(error);
        // const err = error
      }
    } else {
      const contentToDB = content;
      // const timestamp = Date.now()
      setContent("");
      await setDoc(doc(db, "hf_collection", convId, convId, `${Date.now()}`), {
        content: contentToDB,
        // conv_id: convId,
        sender_id: userId,
        sender_img: userImg,
        sender_name: userName,
        timestamp: Date.now(),
        which_user: "user",
        who_sent: "user",
      });
      await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/help_feedback/send_message",
        {
          method: "POST",
          body: JSON.stringify({
            token: JSON.parse(token),
            sender_name: userName,
            sender_img: userImg,
            new_conv: true,
            content: content,
            who_sent: "user",
            user_id: userId,
            which_user: "user",
            convId: convId,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
    }
  };

  useEffect(() => {
    const q = query(collection(db, "hf_collection", convId, convId));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const list = [];
      QuerySnapshot.forEach((doc) => {
        list.push(doc?.data());
        setMessageList(list);
      });
    });
    console.log(messageList);
    if (isLoaded === false) {
      unsubscribe();
    }
  }, [isLoaded === true]);

  useEffect(() => {
    handleCheck();
    fetchUserDetails();
    fetchConversations();
    // scrollToBottom();
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  if (convId === "a") {
    return (
      <section className="user-dashboard chat-admin">
        <div className="chat-wrapper">
          <div className="chat-right-side">
            <div className="your-profile">
              <h3>Admin</h3>
            </div>
            <div className="message-header">
              <h6>Conversations</h6>
            </div>
            <div className="messages-wrapper">No messages to display</div>
            <form className="chat-section" onSubmit={handleSubmit}>
              <div className="typing-bar">
                <textarea
                  type="text"
                  placeholder="Type your message here"
                  className="phone-input3"
                  value={content}
                  onChange={handleContent}
                />
              </div>
              <div className="chat-icons ">
                <div className="attachment">
                  <img src={attachmenticon} alt="" />
                </div>
                <button className="send-message">
                  <img src={sendicon} alt="" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  } else if (convId.length > 1)
    return (
      <section className="user-dashboard chat-admin">
        <div className="chat-wrapper">
          <div className="chat-right-side">
            <div className="your-profile">
              <h3>Help and Support</h3>
            </div>
            <div className="message-header">
              <h6>Conversations</h6>
            </div>
            <div className="messages-wrapper">
              <p className="date-of-msg"></p>
              {messageList?.map((item) =>
                item?.sender_id !== userId ? (
                  <div className="incoming-msgs">
                    <p>{item?.content}</p>
                  </div>
                ) : (
                  <div className="outgoing-msgs">
                    <p>{item?.content}</p>
                  </div>
                )
              )}
              <div ref={bottomRef} />

              <form className="chat-section" onSubmit={handleSubmit}>
                <div className="typing-bar">
                  <textarea
                    type="text"
                    placeholder="Type your message here"
                    className="phone-input3"
                    value={content}
                    onChange={handleContent}
                  />
                </div>
                <div className="chat-icons ">
                  <div className="attachment">
                    <img src={attachmenticon} alt="" />
                  </div>
                  <button className="send-message">
                    <img src={sendicon} alt="" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
};
