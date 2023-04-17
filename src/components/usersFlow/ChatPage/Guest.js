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
  const [token, setToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [new_conv, setNew_conv] = useState(undefined);
  const [content, setContent] = useState("");
  const [convo, setConvo] = useState("");
  const [img, setImg] = useState("");
  const [display, setDisplay] = useState("");
  const [loadM, setLoadM] = useState(false);
  const [loading, setLoading] = useState(false);
  const conversations = sessionStorage.getItem("convo_id");
  const Realtoken = sessionStorage.getItem("guest_token");
  const converse = sessionStorage.getItem("convo");

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
    const q = query(collection(db, "hf_collection", convo, convo));
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
  }, [loadM]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  useEffect(() => {
    createToken();
    console.log(token);
    let convo_id;
    if (converse === null) {
      convo_id = Date.now().toString();
      sessionStorage.setItem("convo_id", JSON.stringify(convo_id));
      setConvId(convo_id);
      // setIsLoaded(true);
      setConvo("a");
      setNew_conv(true);
    } else {
      setConvId(JSON.parse(conversations));
      setIsLoaded(true);
      setConvo(converse);
      setNew_conv(false);
      setLoadM(true);
      // setToken(Realtoken);
    }
  }, []);

  const createToken = async (e) => {
    if (Realtoken == null) {
      try {
        const res = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/help_feedback/generate_guest_user_token",
          {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );

        const data = await res.json();

        console.log(data);
        setIsLoaded(true);
        setToken(data?.token);
        sessionStorage.setItem("guest_token", data?.token);
      } catch (error) {
        // console.log(error);
        // const err = error
      }
    } else {
      setIsLoaded(true);
    }
  };

  const SendMessage = async (e) => {
    // console.log(token);
    e.preventDefault();
    if (content.trim() === "") {
      return;
    }
    // console.log(token, `Guest_${convId}`, new_conv, content, `guest_${convId}`);
    if (new_conv === true || convId === "a") {
      const contentToDB = content;
      setContent("");

      try {
        const res = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/help_feedback/send_message",
          {
            method: "POST",
            body: JSON.stringify({
              token: token,
              sender_name: `Guest_${convId}`,
              new_conv: true,
              sender_img: "a",
              content: contentToDB,
              who_sent: "user",
              which_user: "guest",
              user_id: `guest_${convId}`,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        const data = await res.json();

        if (data.msg === "Message sent") {
          let conv_id = data?.message.conversation_id;
          setConvo(data?.message.conversation_id);
          setNew_conv(false);
          setIsLoaded(true);
          sessionStorage.setItem("convo", data?.message.conversation_id);

          await setDoc(
            doc(db, "hf_collection", conv_id, conv_id, `${Date.now()}`),
            {
              content: contentToDB,
              sender_id: `guest_${convId}`,
              sender_img: "a",
              sender_name: `Guest_${convId}`,
              timestamp: serverTimestamp(),
              which_user: "guest",
              who_sent: "user",
              message_type: img ? "image" : "text",
              file_name: "a",
            }
          );
          audio2.play();
          setLoadM(true);

          const notifyRef = doc(db, "admin_notifiers", "hf_messages");
          await updateDoc(notifyRef, {
            messages_count: increment(1),
          });
          const badgeDocRef = doc(db, "hf_collection", conv_id);
          await setDoc(badgeDocRef, {
            unread_msg_count: 1,
          });
        } else {
          // console.log(" did not send message");
        }
      } catch (error) {
        // console.log(error);
        // const err = error
      }
    } else {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        const contentToDB = content;
        setLoading(true);

        setContent("");
        await setDoc(doc(db, "hf_collection", convo, convo, `${Date.now()}`), {
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
        setLoadM(true);

        const notifyRef = doc(db, "admin_notifiers", "hf_messages");
        await updateDoc(notifyRef, {
          messages_count: increment(1),
        });

        const badge = doc(db, "conversations", convo);
        await updateDoc(badge, {
          unread_user_message_count: increment(1),
        });

        const response = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/help_feedback/send_message",
          {
            method: "POST",
            body: JSON.stringify({
              token: token,
              sender_name: `Guest_${convId}`,
              new_conv: false,
              sender_img: "a",
              content: contentToDB,
              who_sent: "user",
              which_user: "guest",
              user_id: `guest_${convId}`,
              conv_id: convo,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        const res = await response.json();
        if (response.status === 200) {
          console.log("sent message two");
        } else {
          console.log("did not send message two");
        }
      } else if (!e.code) {
        setLoading(true);
        const contentToDB = content;
        setContent("");
        await setDoc(doc(db, "hf_collection", convo, convo, `${Date.now()}`), {
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
        setLoadM(true);

        const notifyRef = doc(db, "admin_notifiers", "hf_messages");
        await updateDoc(notifyRef, {
          messages_count: increment(1),
        });

        const badge = doc(db, "conversations", convo);
        await updateDoc(badge, {
          unread_user_message_count: increment(1),
        });

        const response = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/help_feedback/send_message",
          {
            method: "POST",
            body: JSON.stringify({
              token: token,
              sender_name: `Guest_${convId}`,
              new_conv: false,
              sender_img: "a",
              content: contentToDB,
              who_sent: "user",
              which_user: "guest",
              user_id: `guest_${convId}`,
              conv_id: convo,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        const res = await response.json();
        if (response.status === 200) {
          console.log("sent message two");
        } else {
          console.log("did not send message two");
        }
      }
    }
  };

  if (isLoaded === true) {
    return (
      <div
        className="chat-page"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div className="chat-section" style={{ alignSelf: "center" }}>
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
                // onKeyUp={SendMessage}
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
      <h1 className="loader-screen">
        <ClipLoader color={"#1FAA08"} size={100} />
      </h1>
    );
  }
}
