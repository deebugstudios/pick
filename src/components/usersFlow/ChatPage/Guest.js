import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./chat.css";
import sendicon from "../../Images/sendicon.png";
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
  serverTimestamp,
} from "firebase/firestore";
import dayjs from "dayjs";
import { db, storage } from "../../../utils/firebase";

// flies for audio when sending a message
import audioFile from "../../audio/new_noti.wav";
import audioFile2 from "../../audio/beep2.wav";
const audio = new Audio(audioFile);
const audio2 = new Audio(audioFile2);

export default function Guest() {
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
      const timer = item?.timestamp
        ? dayjs(props.value.seconds * 1000).format("hh:mm a")
        : "...";
      return timer;
    };
    const DateConverter = (props) => {
      // console.log(props)
      const timer = item?.timestamp
        ? dayjs(props.value.seconds * 1000).format("MMM DD, YYYY")
        : "...";
      return timer;
    };
    let cname = "";
    if (item.sender_id === user_id) {
      cname = "outgoing-msgs";
    } else {
      cname = "incoming-msgs";
    }
    return (
      <li
        key={i}
        ref={bottomRef}
        className={cname === "outgoing-msgs" ? "sent" : "received"}
      >
        <div className="message-bubble">
          {item.message_type === "image" ? (
            <>
              <img
                src={item?.content}
                width="100px"
                height=" 100px"
                style={{ marginBottom: "5px", maxWidth: "100px" }}
              />
              <p className="message-time">
                <span>
                  <TimeConverter value={item?.timestamp} />
                </span>
                <span>
                  <DateConverter value={item?.timestamp} />
                </span>
              </p>
            </>
          ) : (
            <>
              <p>{item?.content}</p>
              <p className="message-time">
                <span>
                  <TimeConverter value={item?.timestamp} />
                </span>
                <span>
                  <DateConverter value={item?.timestamp} />
                </span>
              </p>
            </>
          )}
        </div>
      </li>
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
      if (list.length > 0) {
        setNew_conv(false);
      }
    });

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
      setIsLoaded(true);
      setNew_conv(true);
    } else {
      setConvId(JSON.parse(conversations));
      setIsLoaded(true);
    }
  }, []);

  const SendMessage = async (e) => {
    e.preventDefault();
    if (content === "") {
      return;
    }

    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      const contentToDB = content;
      setLoading(true);

      setContent("");
      await setDoc(doc(db, "hf_collection", convId, convId, `${Date.now()}`), {
        content: contentToDB,
        sender_id: `guest_${convId}`,
        sender_img: "a",
        sender_name: `Guest_${convId}`,
        timestamp: serverTimestamp(),
        which_user: "guest",
        who_sent: "user",
        message_type: "text",
      });

      audio2.play();
      //   setIsLoaded(true);
      setLoading(false);

      const notifyRef = doc(db, "admin_notifiers", "hf_messages");
      await updateDoc(notifyRef, {
        messages_count: increment(1),
      });
      if (new_conv === true) {
        setNew_conv(false);
        const badgeDocRef = doc(db, "hf_collection", convId);
        await setDoc(badgeDocRef, {
          // is_admin_in_chat: false,
          unread_user_message_count: 1,
        });
      } else {
        const badge = doc(db, "hf_collection", convId);
        await updateDoc(badge, {
          unread_user_message_count: increment(1),
        });
      }
    } else if (!e.code) {
      setLoading(true);
      const contentToDB = content;
      setContent("");
      await setDoc(doc(db, "hf_collection", convId, convId, `${Date.now()}`), {
        content: contentToDB,
        sender_id: `guest_${convId}`,
        sender_img: "a",
        sender_name: `Guest_${convId}`,
        timestamp: serverTimestamp(),
        which_user: "guest",
        who_sent: "user",
        message_type: "text",
      });

      audio2.play();
      //   setIsLoaded(true);
      setLoading(false);

      const notifyRef = doc(db, "admin_notifiers", "hf_messages");
      await updateDoc(notifyRef, {
        messages_count: increment(1),
      });

      if (new_conv === true) {
        setNew_conv(false);
        const badgeDocRef = doc(db, "hf_collection", convId);
        await setDoc(badgeDocRef, {
          // is_admin_in_chat: false,
          unread_user_message_count: 1,
        });
      } else {
        const badge = doc(db, "hf_collection", convId);
        await updateDoc(badge, {
          unread_user_message_count: increment(1),
        });
      }
    }
  };

  if (isLoaded === true) {
    return (
      <div className="chat-page">
        <div className="chat-section">
          <div className="back2" style={{ cursor: "pointer" }}>
            <span>
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                onClick={() => navigate(-1)}
                className="back"
              ></FontAwesomeIcon>{" "}
            </span>{" "}
            <br />
          </div>
          <div className="chat-container">
            <div className="user-chat-section">
              <div className="user-info">
                <img src={pick} alt="name" />
                <p className="user-info-split">
                  <span className="user-info-name">Help and Support</span>
                  <span className="user-info-email">support@pickload.ng</span>
                </p>
              </div>
              <div className="conversation-name">Conversations</div>
            </div>
            <ul className="messages-wrapper">
              {messageList?.map((item, i) => Messager(item, i))}
              <div ref={bottomRef} />
            </ul>
            <form className="form-message" onSubmit={SendMessage}>
              <textarea
                role="textbox"
                placeholder="Type your message..."
                rows="1"
                cols="20"
                typeof="submit"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyUp={SendMessage}
              />
              <div className="chat-icons">
                <div className="send-message">
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      width: "45px",
                    }}
                    type="submit"
                    disabled={loading}
                    id={content.trim() == "" ? "disabled" : ""}
                  >
                    <img src={sendicon} onClick={SendMessage} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else if (isLoaded === false) {
    return (
      <div className="chat-page">
        <div className="chat-section">
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
          <div className="chat-container">
            <div className="user-chat-section">
              <div className="user-info">
                <img src={pick} alt="name" />
                <p className="user-info-split">
                  <span className="user-info-name">Help and Support</span>
                  <span className="user-info-email">support@pickload.ng</span>
                </p>
              </div>
              <div className="conversation-name">Conversations</div>
            </div>
            <ul>
              <div ref={bottomRef} />
            </ul>
            <form className="form-message">
              <textarea
                role="textbox"
                placeholder="Type your message..."
                rows="1"
                cols="20"
                typeof="submit"
                value={content}
                onKeyUp={SendMessage}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="chat-icons">
                <div className="send-message">
                  <img src={sendicon} alt="" onClick={SendMessage} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
