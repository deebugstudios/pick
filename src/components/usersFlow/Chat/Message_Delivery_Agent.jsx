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
} from "firebase/firestore";
import { db, storage } from "../../../utils/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// flies for audio when sending a message
import audioFile from "../../audio/new_noti.wav";
import audioFile2 from "../../audio/beep2.wav";
const audio = new Audio(audioFile);
const audio2 = new Audio(audioFile2);

export default function Message_Delivery_Agent() {
  const navigate = useNavigate();
  // const value = useContext(TokenContext);
  // const { setNewMsg } = value;
  // const token = JSON.parse(sessionStorage.getItem("rubbish"));
  // const [data, setData] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [result, setResult] = useState("");
  // const [conv_id, setConvId] = useState("");
  // const [result2, setResult2] = useState("");
  // const [data2, setData2] = useState([]);
  // const [firstFire, setFirstFire] = useState(true);
  // const [count, setCount] = useState(0);
  // // const [profile_pic, setProfilePic] = useState('');
  // // const [sender_name, setSenderName] = useState('');

  // const [img, setImg] = useState("");
  // const [display, setDisplay] = useState("");

  // const [loading, setLoading] = useState(false);

  // const [content, setContent] = useState("");
  // const location = useLocation();
  // const navigate = useNavigate();
  // const messagesEndRef = useRef(null);
  // // console.log(location);

  // const receiver_id =
  //   location.state.details.id || location.state.details.delivery_agent_id;
  // const sender_name =
  //   location.state.details.fullname ||
  //   location.state.details.delivery_agent_name;
  // const profile_pic =
  //   location.state.details.img || location.state.details.delivery_agent_img_url;
  // const email =
  //   location.state.details.email || location.state.details.delivery_agent_email;
  // const [new_conv, setNewConv] = useState(false);

  // const Messager = (item, i) => {
  //   console.log(item?.content);
  //   const admin_id = JSON.parse(sessionStorage.getItem("admin_id"));
  //   let DATE = {};
  //   const TimeConverter = (props) => {
  //     // console.log(props)
  //     const date = new Date(props.value);
  //     DATE = {
  //       date: date.toLocaleDateString(),
  //       time: date.toLocaleTimeString(),
  //       combined: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
  //     };
  //     return DATE.time;
  //   };
  //   const DateConverter = (props) => {
  //     // console.log(props)
  //     const date = new Date(props.value);
  //     DATE = {
  //       date: date.toLocaleDateString(),
  //       time: date.toLocaleTimeString(),
  //       combined: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
  //     };
  //     return DATE.date;
  //   };
  //   let cname = "";
  //   if (item.sender_id === admin_id) {
  //     cname = "outgoing-msgs";
  //   } else {
  //     cname = "incoming-msgs";
  //   }
  //   return (
  //     <div
  //       className={
  //         cname === "outgoing-msgs"
  //           ? "shadow-outgoing-msg-container"
  //           : "shadow-incoming-msg-container"
  //       }
  //       ref={messagesEndRef}
  //       key={i}
  //     >
  //       <div
  //         className={
  //           cname === "outgoing-msgs"
  //             ? "shadow-outgoing-msg-wrapper"
  //             : "shadow-incoming-msg-wrapper"
  //         }
  //       >
  //         {/* <p className="date-of-msg"> */}

  //         <div className={cname}>
  //           {/* {item.media ? <img src={item.media} width="100px" height=" 100px" style={{marginBottom: "5px"}} /> : null}  */}
  //           {item.message_type === "image" ? (
  //             <img
  //               src={item.content}
  //               width="100px"
  //               height=" 100px"
  //               style={{ marginBottom: "5px" }}
  //             />
  //           ) : (
  //             <p>{item?.content}</p>
  //           )}
  //         </div>
  //         <p
  //           className={
  //             cname === "outgoing-msgs" ? "date-of-msg" : "shadow-date-of-msg"
  //           }
  //         >
  //           <TimeConverter value={item.timestamp} /> <br />
  //           <DateConverter value={item?.timestamp} />
  //         </p>
  //       </div>
  //     </div>
  //   );
  // };

  // useEffect(() => {
  //   CheckConvers();
  // }, []);

  // // useEffect(() => {
  // //     GetMessages();
  // // }, [conv_id]);

  // useEffect(() => {
  //   const q = query(collection(db, "hf_collection", conv_id, conv_id));
  //   const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
  //     const list = [];
  //     QuerySnapshot.forEach((doc) => {
  //       list.push(doc?.data());
  //       // console.log(doc.data());
  //       setData2(list);
  //       // console.log('got here')
  //       // console.log('exciting times');
  //       // setMessageList(messageList);
  //       // console.log(list.length);
  //     });
  //   });
  //   if (isLoaded === false) {
  //     unsubscribe();
  //   }
  //   // let countM = {};
  //   // const check = onSnapshot(
  //   //   doc(db, "admin_notifiers", "hf_messages"),
  //   //   async (doc) => {
  //   //     countM = doc.data();
  //   //     if (firstFire == true) {
  //   //       setCount(countM.messages_count);
  //   //       setFirstFire(false);
  //   //     } else {
  //   //       if (countM.messages_count !== count) {
  //   //         setCount(countM.messages_count);
  //   //         audio.play();
  //   //         setNewMsg(true);
  //   //       }
  //   //     }
  //   //   }
  //   // );
  // }, [isLoaded === true]);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   // setNewMsg(false);
  // }, [data2]);

  // const CheckConvers = async () => {
  //   try {
  //     // setNewMsg(false);
  //     const response = await fetch(
  //       "https://ancient-wildwood-73926.herokuapp.com/help_feedback_admin/check_convers",
  //       {
  //         method: "POST",

  //         body: JSON.stringify({
  //           token: token,
  //           receiver_id: receiver_id,
  //         }),
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json, text/plain, */*",
  //         },
  //       }
  //     );
  //     // getData(await response.json());
  //     const resultM = await response.json();
  //     console.log(resultM);
  //     setResult(resultM);
  //     if (resultM.msg === "Success") {
  //       setConvId(resultM.conversation_id);
  //       console.log(resultM.conversation_id);
  //       setIsLoaded(true);
  //       setNewConv(false);
  //       console.log("success");
  //     } else if (resultM.msg === "No conversation found") {
  //       setIsLoaded(true);
  //       // setConvId("a");
  //       setNewConv(true);
  //       // setIsLoaded(true);
  //       console.log("not found");
  //     }

  //     if (response.status === 200) {
  //       console.log("data gotten succesfully");
  //     } else {
  //       console.log("some error occurred");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const SendMessage = async (e) => {
  //   e.preventDefault();
  //   if (new_conv === true) {
  //     let url;
  //     if (img) {
  //       const imageRef = ref(
  //         storage,
  //         `messageAttachment/${new Date().getTime()}-${img.name}`
  //       );
  //       const snap = await uploadBytes(imageRef, img);
  //       const durl = await getDownloadURL(ref(storage, snap.ref.fullPath));
  //       url = durl;
  //     }

  //     const contentToDB = content;
  //     setContent("");

  //     try {
  //       const res = await fetch(
  //         "https://ancient-wildwood-73926.herokuapp.com/help_feedback/send_message",
  //         {
  //           method: "POST",
  //           body: JSON.stringify({
  //             token: token,
  //             sender_name: admin_name,
  //             new_conv: true,
  //             sender_img: admin_img || "a",
  //             content: contentToDB ? contentToDB : img.name,
  //             message_type: img ? "image" : "text",
  //             who_sent: "admin",
  //             which_user: "delivery_agent",
  //             user_id: receiver_id,
  //           }),
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json, text/plain, */*",
  //           },
  //         }
  //       );
  //       const resultM = await res.json();
  //       // console.log(resultM);
  //       // setResult2(resultM);

  //       const timestamp = Date.now();

  //       if (resultM.msg === "Message sent") {
  //         // console.log(resultM.message.conversation_id);
  //         // setConvId(resultM.message.conversation_id);
  //         // setNewConv(false);
  //         // console.log("sent message");

  //         await setDoc(
  //           doc(
  //             db,
  //             "hf_collection",
  //             resultM.message.conversation_id,
  //             resultM.message.conversation_id,
  //             `${timestamp}`
  //           ),
  //           {
  //             content: contentToDB ? contentToDB : url,
  //             conv_id: resultM.message.conversation_id,
  //             receiver_id: receiver_id,
  //             sender_id: admin_id,
  //             sender_img: admin_img || attachfileicon || attachfileicon,
  //             sender_name: admin_name,
  //             timestamp: timestamp,
  //             who_sent: "admin",
  //             which_user: "delivery_agent",
  //             user_id: receiver_id,
  //             message_type: img ? "image" : "text",
  //           }
  //         );
  //         setContent("");
  //         audio2.play();

  //         // // update the messages count field
  //         // await setDoc(
  //         //   doc(
  //         //     db,
  //         //     "hf_collection",
  //         //     "statistics"
  //         //   ),
  //         //   {messages_count: count + 1}
  //         // );
  //       } else {
  //         console.log(" did not send message");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       // const err = error
  //     }
  //     setContent("");
  //     setImg("");
  //     setDisplay("");
  //   } else {
  //     if (e.keyCode === 13 && e.shiftKey === false) {
  //       let url;
  //       if (img) {
  //         const imageRef = ref(
  //           storage,
  //           `messageAttachment/${new Date().getTime()}-${img.name}`
  //         );
  //         const snap = await uploadBytes(imageRef, img);
  //         const durl = await getDownloadURL(ref(storage, snap.ref.fullPath));
  //         url = durl;
  //       }
  //       const contentToDB = content;
  //       // const timestamp = Date.now()
  //       console.log(conv_id);
  //       setContent("");
  //       const timestamp = Date.now();
  //       await setDoc(
  //         doc(db, "hf_collection", conv_id, conv_id, `${timestamp}`),
  //         {
  //           content: contentToDB ? contentToDB : url,
  //           conv_id: conv_id,
  //           receiver_id: receiver_id,
  //           sender_id: admin_id,
  //           sender_img: admin_img || attachfileicon || attachfileicon,
  //           sender_name: admin_name,
  //           timestamp: timestamp,
  //           who_sent: "admin",
  //           which_user: "delivery_agent",
  //           user_id: receiver_id,
  //           message_type: img ? "image" : "text",
  //         }
  //       );
  //       // // update the messages count field
  //       // await setDoc(
  //       //   doc(
  //       //     db,
  //       //     "hf_collection",
  //       //     "statistics"
  //       //   ),
  //       //   {messages_count: count + 1}
  //       // );

  //       audio2.play();
  //       const response = await fetch(
  //         "https://ancient-wildwood-73926.herokuapp.com/help_feedback/send_message",
  //         {
  //           method: "POST",
  //           body: JSON.stringify({
  //             token: token,
  //             // receiver_id: receiver_id,
  //             sender_name: admin_name,
  //             new_conv: false,
  //             sender_img: admin_img || "a",
  //             content: contentToDB ? contentToDB : img.name,
  //             who_sent: "admin",
  //             which_user: "delivery_agent",
  //             user_id: receiver_id,
  //             conv_id: conv_id,
  //             message_type: img ? "image" : "text",
  //           }),
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json, text/plain, */*",
  //           },
  //         }
  //       );
  //       const res = await response.json();
  //       if (response.status === 200) {
  //         console.log("sent message two");
  //       } else {
  //         console.log("did not send message two");
  //       }
  //       setContent("");
  //       setImg("");
  //       setDisplay("");
  //     } else if (!e.code) {
  //       setLoading(true);

  //       let url;
  //       if (img) {
  //         const imageRef = ref(
  //           storage,
  //           `messageAttachment/${new Date().getTime()}-${img.name}`
  //         );
  //         const snap = await uploadBytes(imageRef, img);
  //         const durl = await getDownloadURL(ref(storage, snap.ref.fullPath));
  //         url = durl;
  //       }
  //       const contentToDB = content;
  //       // const timestamp = Date.now()
  //       console.log(conv_id);
  //       setContent("");
  //       const timestamp = Date.now();
  //       await setDoc(
  //         doc(db, "hf_collection", conv_id, conv_id, `${timestamp}`),
  //         {
  //           content: contentToDB ? contentToDB : url,
  //           conv_id: conv_id,
  //           receiver_id: receiver_id,
  //           sender_id: admin_id,
  //           sender_img: admin_img || attachfileicon || attachfileicon,
  //           sender_name: admin_name,
  //           timestamp: timestamp,
  //           who_sent: "admin",
  //           which_user: "delivery_agent",
  //           user_id: receiver_id,
  //           message_type: img ? "image" : "text",
  //         }
  //       );
  //       //   // update the messages count field
  //       //   await setDoc(
  //       //     doc(
  //       //       db,
  //       //       "hf_collection",
  //       //       "statistics"
  //       //     ),
  //       //     {messages_count: count + 1}
  //       //   );
  //       audio2.play();
  //       const response = await fetch(
  //         "https://ancient-wildwood-73926.herokuapp.com/help_feedback/send_message",
  //         {
  //           method: "POST",
  //           body: JSON.stringify({
  //             token: token,
  //             // receiver_id: receiver_id,
  //             sender_name: admin_name,
  //             new_conv: false,
  //             sender_img: admin_img || "a",
  //             content: contentToDB ? contentToDB : img.name,
  //             who_sent: "admin",
  //             which_user: "delivery_agent",
  //             user_id: receiver_id,
  //             conv_id: conv_id,
  //             message_type: img ? "image" : "text",
  //           }),
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json, text/plain, */*",
  //           },
  //         }
  //       );
  //       const res = await response.json();
  //       if (response.status === 200) {
  //         console.log("sent message two");
  //       } else {
  //         console.log("did not send message two");
  //       }
  //       setContent("");
  //       setImg("");
  //       setDisplay("");
  //       setLoading(false);
  //     }
  //   }
  // };

  // const handleChange = (e) => {
  //   setImg(e.target.files[0]);
  //   setDisplay(URL.createObjectURL(e.target.files[0]));
  // };

  // if (!isLoaded) {
  //   console.log("got here");
  //   return (
  //     <h1 className="loading-pages1">
  //       <ClipLoader color={"#1FAA08"} size={100} />
  //     </h1>
  //   );
  // } else if (conv_id?.length > 0) {
  //   // console.log(conv_id);
  //   return (
  //     <div className="support-chat">
  //       <div className="chat-wrapper">
  //         <div className="back2">
  //           <span>
  //             <FontAwesomeIcon
  //               icon={faArrowLeftLong}
  //               onClick={() => navigate(-1)}
  //               className="back"
  //             ></FontAwesomeIcon>{" "}
  //           </span>{" "}
  //           <br />
  //         </div>
  //         <div className="chat-right-side">
  //           {display && (
  //             <span className="photo_display">
  //               {display && <img src={display} width="100%" height="100%" />}{" "}
  //             </span>
  //           )}
  //           <div className="shadow-chat-right-side-wrapper">
  //             <div className="main-chat-discussion">
  //               <div className="profile-picture1">
  //                 <img
  //                   src={profile_pic ? profile_pic : aang}
  //                   alt="icon"
  //                   className="support-profile-pic1"
  //                 />
  //               </div>
  //               <div className="your-profile">
  //                 <h3>{sender_name}</h3>
  //                 <h6>{email ? email : "Delivery Agent"}</h6>
  //               </div>
  //             </div>
  //             {/* <div className="message-header">
  //               <h6>Conversations</h6>
  //             </div> */}

  //             <div className="messages-wrapper">
  //               {data2?.map((item, i) => Messager(item, i))}
  //               <div ref={messagesEndRef} />
  //               <div className="shadow-chat-section">
  //                 <form
  //                   onSubmit={SendMessage}
  //                   style={{
  //                     width: "100%",
  //                     display: "flex",
  //                     justifyContent: "space-evenly",
  //                     alignItems: "center",
  //                   }}
  //                 >
  //                   <div className="typing-bar">
  //                     <textarea
  //                       disabled={img}
  //                       role="textbox"
  //                       placeholder="Type your message..."
  //                       className="shadow-text-area"
  //                       rows="1"
  //                       cols="20"
  //                       typeof="submit"
  //                       value={content}
  //                       onChange={(e) => setContent(e.target.value)}
  //                       onKeyUp={SendMessage}
  //                     ></textarea>
  //                   </div>
  //                   <div className="chat-icons">
  //                     <label
  //                       htmlFor="img"
  //                       className="shadow-label-text"
  //                       id={content ? "disabled" : ""}
  //                     >
  //                       <img src={attachfileicon} width="30px" height="30px" />
  //                     </label>
  //                     <input
  //                       type="file"
  //                       name="img"
  //                       id="img"
  //                       accept="image/*"
  //                       onChange={handleChange}
  //                       style={{ display: "none" }}
  //                       disabled={content}
  //                     />

  //                     <div className="send-message">
  //                       <button
  //                         style={{
  //                           backgroundColor: "transparent",
  //                           border: "none",
  //                           width: "45px",
  //                         }}
  //                         disabled={loading}
  //                         id={!content && !img ? "disabled" : ""}
  //                       >
  //                         <img src={sendicon} onClick={SendMessage} />
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </form>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else if (conv_id === "") {
  //   console.log('render second');
  return (
    <div className="support-chat">
      <div className="chat-wrapper">
        <div className="chat-right-side">
          <div className="shadow-chat-right-side-wrapper">
            <div className="main-chat-discussion">
              <div className="profile-picture1">
                <img
                  src=/*{profile_pic ? profile_pic : aang}*/ {pick}
                  alt="icon"
                  className="support-profile-pic1"
                />
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
              {/* <div ref={messagesEndRef} /> */}
              <div className="shadow-chat-section">
                <div className="typing-bar">
                  <textarea
                    role="textbox"
                    placeholder="Type your message..."
                    className="shadow-text-area"
                    rows="1"
                    cols="20"
                    typeof="submit"
                    // value={content}
                    // onChange={(e) => setContent(e.target.value)}
                    // onKeyUp={SendMessage}
                  ></textarea>
                </div>
                <div className="chat-icons">
                  <div className="send-message">
                    <img src={sendicon} alt="" /*onClick={SendMessage}*/ />
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
// }
