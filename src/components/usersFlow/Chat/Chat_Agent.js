import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./support.css";
import sendicon from "../../Images/sendicon.png";
import attachfileicon from "../../Images/attachfileicon.png";
import aang from "../../Images/aang.jpg";
import pick from "../../Images/logo192.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
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
  updateDoc,
  increment,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../../utils/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dayjs from "dayjs";
import { DateConverter } from "../../../DateAndTimeConverter";
import { TimeConverter } from "../../../DateAndTimeConverter";
// flies for audio when sending a message
import audioFile from "../../audio/new_noti.wav";
import audioFile2 from "../../audio/beep2.wav";
const audio = new Audio(audioFile);
const audio2 = new Audio(audioFile2);

export default function Chat_Agent() {
  const location = useLocation();
  const agentId = location.state.agentId;
  const agentImg = location.state.agentImg;
  const agentName = location.state.agentName;
  const agentEmail = location.state.agentEmail;
  const check = location.state.check;
  const navigate = useNavigate();

  const [convId, setConvId] = useState("");
  const [messageList, setMessageList] = useState([]);
  const bottomRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const userValues = useContext(userContext);
  const { token, userName, email, userNumber, userImg, userId } = userValues;
  const [new_conv, setNew_conv] = useState(undefined);
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [display, setDisplay] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(check);
  // const [data, setData] = useState([]);

  // const [result, setResult] = useState("");
  // const [result2, setResult2] = useState("");
  // const [firstFire, setFirstFire] = useState(true);
  // const [count, setCount] = useState(0);
  // // const [profile_pic, setProfilePic] = useState('');
  // // const [sender_name, setSenderName] = useState('');

  // const receiver_id =
  //   location.state.details.id || location.state.details.delivery_agent_id;
  // const sender_name =
  //   location.state.details.fullname ||
  //   location.state.details.delivery_agent_name;
  // const profile_pic =
  //   location.state.details.img || location.state.details.delivery_agent_img_url;
  // const email =
  //   location.state.details.email || location.state.details.delivery_agent_email;

  // console.log(convId);

  const Messager = (item, i) => {
    // console.log(item?.content);
    const user_id = JSON.parse(userId);
    let DATE = {};
    // const TimeConverter = (props) => {
    //   // console.log(props)
    //   const date = new Date(props.value);
    //   DATE = {
    //     date: date.toLocaleDateString(),
    //     time: date.toLocaleTimeString(),
    //     combined: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    //   };
    //   return DATE.time;
    // };
    // const DateConverter = (props) => {
    //   // console.log(props)
    //   const date = new Date(props.value);
    //   DATE = {
    //     date: date.toLocaleDateString(),
    //     time: date.toLocaleTimeString(),
    //     combined: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    //   };
    //   return DATE.date;
    // };
    let cname = "";
    if (item.sender_id === user_id) {
      cname = "outgoing-msgs";
    } else {
      cname = "incoming-msgs";
    }
    return (
      <div
        className={
          cname === "outgoing-msgs"
            ? "shadow-outgoing-msg-container"
            : "shadow-incoming-msg-container"
        }
        ref={bottomRef}
        key={i}
      >
        <div
          className={
            cname === "outgoing-msgs"
              ? "shadow-outgoing-msg-wrapper"
              : "shadow-incoming-msg-wrapper"
          }
        >
          {/* <p className="date-of-msg"> */}

          <div className={cname}>
            {/* {item.media ? <img src={item.media} width="100px" height=" 100px" style={{marginBottom: "5px"}} /> : null}  */}
            {item.message_type === "image" ? (
              <img
                src={item.content}
                width="100px"
                height=" 100px"
                style={{ marginBottom: "5px", maxWidth: "100px" }}
              />
            ) : (
              <p>{item?.content}</p>
            )}
          </div>
          <p
            className={
              cname === "outgoing-msgs" ? "date-of-msg" : "shadow-date-of-msg"
            }
          >
            <TimeConverter value={item?.timestamp} /> <br />
            <DateConverter value={item?.timestamp} />
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const q = query(
      collection(db, "messages_collection", convId, convId),
      orderBy("timestamp", "asc")
    );
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

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
      // console.log(data);
      if (data.msg === "Success") {
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

  useEffect(() => {
    handleCheck();
  }, []);

  const SendMessage = async (e) => {
    e.preventDefault();
    if (content.trim() === "") {
      return;
    }
    if (new_conv === true || convId === "a") {
      const contentToDB = content;
      setContent("");

      try {
        const res = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/user_chat/send_message",
          {
            method: "POST",
            body: JSON.stringify({
              token: JSON.parse(token),
              sender_name: JSON.parse(userName),
              new_conv: true,
              sender_img: userImg ? JSON.parse(userImg) : "a",
              receiver_id: agentId,
              content: contentToDB,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        const data = await res.json();

        if (data.msg === "Message sent") {
          let conv_id = data.message.conversation_id;
          setConvId(data.message.conversation_id);
          setNew_conv(false);

          await setDoc(
            doc(db, "messages_collection", conv_id, conv_id, `${Date.now()}`),
            {
              content: contentToDB,
              sender_id: JSON.parse(userId),
              sender_img: userImg ? JSON.parse(userImg) : "a",
              receiver_id: agentId,
              sender_name: JSON.parse(userName),
              timestamp: Date.now(),
              conv_id: conv_id,
            }
          );
          audio2.play();
        } else {
          // console.log(" did not send message");
        }
      } catch (error) {
        // console.log(error);
        // const err = error
      }
      setContent("");
    } else {
      if (e.keyCode === 13 && e.shiftKey === false) {
        setLoading(true);
        const contentToDB = content;
        setContent("");
        const timestamp = Date.now();
        await setDoc(
          doc(db, "messages_collection", convId, convId, `${Date.now()}`),
          {
            content: contentToDB,
            sender_id: JSON.parse(userId),
            sender_img: userImg ? JSON.parse(userImg) : "a",
            sender_name: JSON.parse(userName),
            timestamp: Date.now(),
            conv_id: convId,
            receiver_id: agentId,
          }
        );

        audio2.play();

        const response = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/user_chat/send_message",
          {
            method: "POST",
            body: JSON.stringify({
              token: JSON.parse(token),
              sender_name: JSON.parse(userName),
              new_conv: false,
              sender_img: userImg ? JSON.parse(userImg) : "a",
              content: contentToDB,
              receiver_id: agentId,
              conv_id: convId,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        const res = await response.json();
        if (response.status === 200) {
          // console.log("sent message two");
        } else {
          // console.log("did not send message two");
        }
        setContent("");
        setLoading(false);
      } else if (!e.code) {
        setLoading(true);
        const contentToDB = content;
        setContent("");
        await setDoc(
          doc(db, "messages_collection", convId, convId, `${Date.now()}`),
          {
            content: contentToDB,
            sender_id: JSON.parse(userId),
            sender_img: userImg ? JSON.parse(userImg) : "a",
            sender_name: JSON.parse(userName),
            timestamp: Date.now(),
            conv_id: convId,
            receiver_id: agentId,
          }
        );

        audio2.play();

        const response = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/user_chat/send_message",
          {
            method: "POST",
            body: JSON.stringify({
              token: JSON.parse(token),
              sender_name: JSON.parse(userName),
              new_conv: false,
              sender_img: userImg ? JSON.parse(userImg) : "a",
              content: contentToDB,
              receiver_id: agentId,
              conv_id: convId,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        const res = await response.json();
        setContent("");
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setImg(e.target.files[0]);
  };

  if (!isLoaded) {
    return (
      <h1 className="loader-screen">
        <ClipLoader color={"#1FAA08"} size={100} />
      </h1>
    );
  } else if (convId?.length > 1) {
    return (
      <div className="support-chat">
        <div className="chat-wrapper">
          {/* <div className="back2">
            <span>
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                onClick={() => navigate(-1)}
                className="back"
              ></FontAwesomeIcon>{" "}
            </span>{" "}
            <br />
          </div> */}
          <div className="chat-right-side">
            <div className="shadow-chat-right-side-wrapper">
              <div className="main-chat-discussion">
                <div className="profile-picture1">
                  <img
                    src={agentImg}
                    alt="icon"
                    className="support-profile-pic1"
                  />
                </div>
                <div className="your-profile">
                  <h3>{agentName}</h3>
                  <h6>{agentEmail}</h6>
                </div>
              </div>
              {/* <div className="message-header">
                  <h6>Conversations</h6>
                </div> */}

              <div className="messages-wrapper">
                {messageList?.map((item, i) => Messager(item, i))}
                <div ref={bottomRef} />
                {check === 0 ? (
                  <div className="shadow-chat-section">
                    <form
                      onSubmit={SendMessage}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <div className="typing-bar">
                        <textarea
                          // disabled={img}
                          role="textbox"
                          placeholder="Type your message..."
                          className="shadow-text-area"
                          rows="1"
                          cols="20"
                          typeof="submit"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          onKeyUp={SendMessage}
                        ></textarea>
                      </div>
                      <div className="chat-icons">
                        {/* <label
                        htmlFor="img"
                        className="shadow-label-text"
                        id={content ? "disabled" : ""}
                      >
                        <img src={attachfileicon} width="30px" height="30px" />
                      </label>
                      <input
                        type="file"
                        name="img"
                        id="img"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "none" }}
                        disabled={content}
                      /> */}

                        <div className="send-message">
                          <button
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              width: "45px",
                            }}
                            disabled={loading}
                            id={content.trim() == "" ? "disabled" : ""}
                          >
                            <img src={sendicon} onClick={SendMessage} />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (convId === "a") {
    return (
      <div className="support-chat">
        <div className="chat-wrapper">
          <div className="chat-right-side">
            <div className="shadow-chat-right-side-wrapper">
              <div className="main-chat-discussion">
                <div className="profile-picture1">
                  <img
                    src={agentImg}
                    alt="icon"
                    className="support-profile-pic1"
                  />
                </div>
                <div className="your-profile">
                  <h3>{agentName}</h3>
                  <h6>{agentEmail}</h6>
                </div>
              </div>
              <div className="message-header">
                <h6>Conversations</h6>
              </div>

              <div className="messages-wrapper">
                {/* {messageList?.map((item, i) => Messager(item, i))} */}
                <div ref={bottomRef} />
                {check == 0 ? (
                  <div className="shadow-chat-section">
                    <div className="typing-bar">
                      <textarea
                        role="textbox"
                        placeholder="Type your message..."
                        className="shadow-text-area"
                        rows="1"
                        cols="20"
                        typeof="submit"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        // onKeyUp={SendMessage}
                      ></textarea>
                    </div>
                    <div className="chat-icons">
                      <div className="send-message">
                        <img src={sendicon} alt="" onClick={SendMessage} />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
