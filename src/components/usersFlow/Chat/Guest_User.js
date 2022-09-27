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
} from "firebase/firestore";
import { db, storage } from "../../../utils/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// flies for audio when sending a message
import audioFile from "../../audio/new_noti.wav";
import audioFile2 from "../../audio/beep2.wav";
const audio = new Audio(audioFile);
const audio2 = new Audio(audioFile2);

export default function Guest_User() {
  const navigate = useNavigate();
  const [convId, setConvId] = useState("");
  const [messageList, setMessageList] = useState([]);
  const bottomRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [new_conv, setNew_conv] = useState(undefined);
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [display, setDisplay] = useState("");
  const [loading, setLoading] = useState(false);
  const conversations = sessionStorage.getItem("convo_id");

  const Messager = (item, i) => {
    // console.log(item?.content);
    const user_id = `guest_${convId}`;
    let DATE = {};
    const TimeConverter = (props) => {
      // console.log(props)
      const date = new Date(props.value);
      DATE = {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        combined: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      };
      return DATE.time;
    };
    const DateConverter = (props) => {
      // console.log(props)
      const date = new Date(props.value);
      DATE = {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        combined: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      };
      return DATE.date;
    };
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
                style={{ marginBottom: "5px" }}
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
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  useEffect(() => {
    let convo_id;
    if (conversations === null) {
      convo_id = Date.now().toString();
      sessionStorage.setItem("convo_id", JSON.stringify(convo_id));
      setConvId(convo_id);
      //   setIsLoaded(true);
      console.log(convo_id);
    } else {
      setConvId(JSON.parse(conversations));
      //   setIsLoaded(true);
      //   console.log(conversations);
      //   const q = query(collection(db, "hf_collection", convo_id, convo_id));
      //   const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      //     const list = [];
      //     QuerySnapshot.forEach((doc) => {
      //       list.push(doc?.data());
      //       setMessageList(list);
      //     });
      //   });
      //   console.log(messageList);
      //   if (isLoaded === false) {
      //     unsubscribe();
      //   }
    }
  }, []);

  const SendMessage = async (e) => {
    e.preventDefault();
    if (content === "") {
      return;
    }

    if (e.keyCode === 13 && e.shiftKey === false) {
      const contentToDB = content;
      console.log(contentToDB);
      console.log(convId);
      setLoading(true);

      setContent("");
      await setDoc(doc(db, "hf_collection", convId, convId, `${Date.now()}`), {
        content: contentToDB,
        sender_id: `guest_${convId}`,
        sender_img: "a",
        sender_name: `Guest_${convId}`,
        timestamp: Date.now(),
        which_user: "guest",
        who_sent: "user",
        message_type: "text",
      });

      audio2.play();
      setIsLoaded(true);

      const notifyRef = doc(db, "admin_notifiers", "hf_messages");
      await updateDoc(notifyRef, {
        messages_count: increment(1),
      });
      setContent("");
      setDisplay("");
      setLoading(false);
    } else if (!e.code) {
      setLoading(true);
      const contentToDB = content;
      setContent("");
      await setDoc(doc(db, "hf_collection", convId, convId, `${Date.now()}`), {
        content: contentToDB,
        sender_id: `guest_${convId}`,
        sender_img: "a",
        sender_name: `Guest_${convId}`,
        timestamp: Date.now(),
        which_user: "guest",
        who_sent: "user",
        message_type: "text",
      });

      audio2.play();
      setIsLoaded(true);

      const notifyRef = doc(db, "admin_notifiers", "hf_messages");
      await updateDoc(notifyRef, {
        messages_count: increment(1),
      });
      setContent("");
      setDisplay("");
      setLoading(false);
    }
  };

  if (isLoaded === true) {
    return (
      <div className="support-chat">
        <div className="chat-wrapper">
          <div className="back2">
            <span>
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                onClick={() => navigate(-1)}
                className="back"
              ></FontAwesomeIcon>{" "}
            </span>{" "}
            <br />
          </div>
          <div className="chat-right-side">
            {display && (
              <span className="photo_display">
                {display && <img src={display} width="100%" height="100%" />}{" "}
              </span>
            )}
            <div className="shadow-chat-right-side-wrapper">
              <div className="main-chat-discussion">
                <div className="profile-picture1">
                  <img src={pick} alt="icon" className="support-profile-pic1" />
                </div>
                <div className="your-profile">
                  <h3>Help and Support</h3>
                  <h6>pickload1@gmail.com</h6>
                </div>
              </div>
              <div className="message-header">
                <h6>Conversations</h6>
              </div>

              <div className="messages-wrapper">
                {messageList?.map((item, i) => Messager(item, i))}
                <div ref={bottomRef} />
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
                        disabled={img}
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
                      <div className="send-message">
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            width: "45px",
                          }}
                          disabled={loading}
                          id={!content && !img ? "disabled" : ""}
                        >
                          <img src={sendicon} onClick={SendMessage} />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (isLoaded === false) {
    return (
      <div className="support-chat">
        <div className="chat-wrapper">
          <div className="back2">
            <span>
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                onClick={() => navigate(-1)}
                className="back"
              ></FontAwesomeIcon>{" "}
            </span>{" "}
            <br />
          </div>
          <div className="chat-right-side">
            <div className="shadow-chat-right-side-wrapper">
              <div className="main-chat-discussion">
                <div className="profile-picture1">
                  <img src={pick} alt="icon" className="support-profile-pic1" />
                </div>
                <div className="your-profile">
                  <h3>Help and Support</h3>
                  <h6>pickload1@gmail.com</h6>
                </div>
              </div>
              <div className="message-header">
                <h6>Conversations</h6>
              </div>

              <div className="messages-wrapper">
                <div ref={bottomRef} />
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
                      onKeyUp={SendMessage}
                    ></textarea>
                  </div>
                  <div className="chat-icons">
                    <div className="send-message">
                      <img src={sendicon} alt="" onClick={SendMessage} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
