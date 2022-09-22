import React from "react";
import "./agentlist.css";
import pickload from '../../Images/pickload.png'
export default function AgentList() {

  const dataList = 
  [
      {
        profileImage : pickload,
        profileName : "Shadow",
        message: "testing",
        sentAt: "2 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Chinedu",
        message: "testing 1235",
        sentAt: "4 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Light",
        message: "test",
        sentAt: "20 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mira",
        message: "checing up on you fam",
        sentAt: "29 mins ago"
      },
      {
        profileImage : pickload,
        profileName : "Mr Obinna",
        message: "checing up on you fam checing up on you famchecing up on you famchecing up on you famchecing up on you famchecing up on you famchecing up on you famchecing up on you famchecing up on you famchecing up on you famchecing up on you fam",
        sentAt: "29 mins ago"
      },
  ]

  function handleClick(){
    alert("success")
  }

  const displayData = dataList.map((user, i)=> (
    <div className="shadow-agent-wrapper">
      <div className="shadow-agent-container" onClick={handleClick}>
        <div className="shadow-agent-image">
          <img src={pickload} />
        </div>
        <div className="shadow-message-info-container">
          <h3>{user?.profileName}</h3>
          <p> {user?.message}</p>
        </div>
      <div className="shadow-time-of-message">
        <p>{user?.sentAt}</p>
      </div>
      </div>
    </div>
  ))


  return (
    <section className="shadow-agentlist-wrapper">
      <div className="shadow-agentlist-container">
        <h3>Messages</h3>
        {displayData}
      </div>
    </section>
    )
}
