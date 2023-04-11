import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./chat.css";
import sendicon from "../../Images/sendicon.png";
import attachfileicon from "../../Images/attachfileicon.png";
import aang from "../../Images/aang.jpg";
import pick from "../../Images/logo192.png";
import dayjs from "dayjs";
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
  deleteDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../../utils/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// flies for audio when sending a message
import audioFile from "../../audio/new_noti.wav";
import audioFile2 from "../../audio/beep2.wav";
const audio = new Audio(audioFile);
const audio2 = new Audio(audioFile2);

export default function Chat() {
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

  const Messager = (item, i) => {
    // console.log(item?.content);
    const user_id = JSON.parse(userId);
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
    const q = query(
      collection(db, "hf_collection", convId, convId),
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
      } else if (
        data.msg === "Help feedback admin changed, new conversation created"
      ) {
        setConvId(data.conversation_id);
        setIsLoaded(true);
        setNew_conv(false);
        const oldConvIDToBeDeleted = data.conversation_id;
        await deleteDoc(doc(db, "hf_collection", oldConvIDToBeDeleted));
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    handleCheck();
  }, []);

  const SendMessage = async (e) => {
    e.preventDefault();
    console.log(convId);
    if (content.trim() === "" && img === "") {
      return;
    }
    if (new_conv === true || convId === "a") {
      let url;
      if (img) {
        const imageRef = ref(
          storage,
          `messageAttachment/${new Date().getTime()}-${img.name}`
        );
        const snap = await uploadBytes(imageRef, img);
        const durl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = durl;
      }

      const contentToDB = content;
      setContent("");

      try {
        const res = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/help_feedback/send_message",
          {
            method: "POST",
            body: JSON.stringify({
              token: JSON.parse(token),
              sender_name: JSON.parse(userName),
              new_conv: true,
              sender_img: userImg ? JSON.parse(userImg) : "a",
              content: contentToDB ? contentToDB : img.name,
              who_sent: "user",
              which_user: "user",
              user_id: JSON.parse(userId),
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
            doc(db, "hf_collection", conv_id, conv_id, `${Date.now()}`),
            {
              content: contentToDB ? contentToDB : url,
              sender_id: JSON.parse(userId),
              sender_img: userImg ? JSON.parse(userImg) : "a",
              sender_name: JSON.parse(userName),
              timestamp: serverTimestamp(),
              which_user: "user",
              who_sent: "user",
              message_type: img ? "image" : "text",
              file_name: contentToDB ? "a" : `IMG_${Date.now()}`,
            }
          );
          audio2.play();

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
      setContent("");
      setImg("");
      setDisplay("");
      handleCheck();

      // window.location.reload();
    } else {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        setLoading(true);
        let url;
        if (img) {
          const imageRef = ref(
            storage,
            `messageAttachment/${new Date().getTime()}-${img.name}`
          );
          const snap = await uploadBytes(imageRef, img);
          const durl = await getDownloadURL(ref(storage, snap.ref.fullPath));
          url = durl;
        }
        const contentToDB = content;
        setContent("");
        const timestamp = Date.now();
        await setDoc(
          doc(db, "hf_collection", convId, convId, `${Date.now()}`),
          {
            content: contentToDB ? contentToDB : url,
            sender_id: JSON.parse(userId),
            sender_img: userImg ? JSON.parse(userImg) : "a",
            sender_name: JSON.parse(userName),
            timestamp: serverTimestamp(),
            which_user: "user",
            who_sent: "user",
            message_type: img ? "image" : "text",
            file_name: contentToDB ? "a" : `IMG_${Date.now()}`,
          }
        );

        audio2.play();

        const notifyRef = doc(db, "admin_notifiers", "hf_messages");
        await updateDoc(notifyRef, {
          messages_count: increment(1),
        });

        const badge = doc(db, "conversations", convId);
        await updateDoc(badge, {
          unread_msg_count: increment(1),
        });

        const response = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/help_feedback/send_message",
          {
            method: "POST",
            body: JSON.stringify({
              token: JSON.parse(token),
              sender_name: JSON.parse(userName),
              new_conv: false,
              sender_img: userImg ? JSON.parse(userImg) : "a",
              content: contentToDB ? contentToDB : img.name,
              who_sent: "user",
              which_user: "user",
              user_id: JSON.parse(userId),
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
        setImg("");
        setDisplay("");
        setLoading(false);
      } else if (!e.code) {
        setLoading(true);

        let url;
        if (img) {
          const imageRef = ref(
            storage,
            `messageAttachment/${new Date().getTime()}-${img.name}`
          );
          const snap = await uploadBytes(imageRef, img);
          const durl = await getDownloadURL(ref(storage, snap.ref.fullPath));
          url = durl;
        }
        const contentToDB = content;
        setContent("");
        await setDoc(
          doc(db, "hf_collection", convId, convId, `${Date.now()}`),
          {
            content: contentToDB ? contentToDB : url,
            sender_id: JSON.parse(userId),
            sender_img: userImg ? JSON.parse(userImg) : "a",
            sender_name: JSON.parse(userName),
            timestamp: serverTimestamp(),
            which_user: "user",
            who_sent: "user",
            message_type: img ? "image" : "text",
            file_name: contentToDB ? "a" : `IMG_${Date.now()}`,
          }
        );

        audio2.play();

        const notifyRef = doc(db, "admin_notifiers", "hf_messages");
        await updateDoc(notifyRef, {
          messages_count: increment(1),
        });

        const badge = doc(db, "conversations", convId);
        await updateDoc(badge, {
          unread_msg_count: increment(1),
        });
        const response = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/help_feedback/send_message",
          {
            method: "POST",
            body: JSON.stringify({
              token: JSON.parse(token),
              sender_name: JSON.parse(userName),
              new_conv: false,
              sender_img: userImg ? JSON.parse(userImg) : "a",
              content: contentToDB ? contentToDB : img.name,
              who_sent: "user",
              which_user: "user",
              user_id: JSON.parse(userId),
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
        setImg("");
        setDisplay("");
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setImg(e.target.files[0]);
    setDisplay(URL.createObjectURL(e.target.files[0]));
  };

  if (!isLoaded) {
    return (
      <h1 className="loader-screen">
        <ClipLoader color={"#1FAA08"} size={100} />
      </h1>
    );
  } else if (convId?.length > 1) {
    return (
      <div className="chat-page">
        <div className="chat-section">
          {display && (
            <span className="photo_display">
              {display && <img src={display} width="100%" height="100%" />}{" "}
            </span>
          )}
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
                disabled={img}
                role="textbox"
                placeholder="Type your message..."
                rows="1"
                cols="20"
                typeof="submit"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyUp={SendMessage}
                onSubmit={SendMessage}
              />
              <div className="chat-icons">
                <label
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
                />

                <div className="send-message">
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      width: "45px",
                    }}
                    type="submit"
                    disabled={loading}
                    id={content.trim() == "" && !img ? "disabled" : ""}
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
  } else if (convId === "a") {
    return (
      <div className="chat-page">
        <div className="chat-section">
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
            <form className="form-message" onSubmit={SendMessage}>
              <textarea
                role="textbox"
                placeholder="Type your message..."
                rows="1"
                cols="20"
                typeof="submit"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="chat-icons">
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    width: "45px",
                  }}
                  type="submit"
                  disabled={loading}
                  id={content.trim() == "" && !img ? "disabled" : ""}
                >
                  <img src={sendicon} alt="" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
