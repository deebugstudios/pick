// import {createContext, useContext, useEffect, useState} from 'react'
// import SideBar from '../../javascripts/SideBar';
// import {fetchData} from "../Data/profileData"
// const RiderContext = createContext();

// export  const useRiderContext= () => {
//     return useContext(RiderContext)
// }

// export const UseRiderProvider = () => {
//     const [currentUserData, setCurrentUserData] = useState()
//     useEffect(()=> {
//         fetchData()
//     },[])
//     const fetchData = async() => {
//         const res = await fetch("https://guarded-falls-60982.herokuapp.com/delivery_agent_profile/view_single_profile" , {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             delivery_agent_id:"62de6928e9d7da95308f28fd",
//             token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjkyOGU5ZDdkYTk1MzA4ZjI4ZmQiLCJwaG9uZV9ubyI6IisyMzQ4MTQ5NTE5MTY2IiwiaWF0IjoxNjU4NzQzMDgwfQ.5owkE0ocEQBhcjCN7dsk2gK46itrDMsnJ2CAq_bOYz8"
//           })

//         });
//         const data = await res.json();
//         const finalData = data.delivery_agent
//         console.log(finalData)
//         setCurrentUserData(finalData)
//       }
//     const values = {
//          currentUserData
//     }
//     return (
//     <RiderContext.Provider value={values}>
//         <SideBar/>
//     </RiderContext.Provider>
//     )
// }
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import SideBar from "../../javascripts/SideBar";
import { useFetch } from "../CustomHook/useFect";
const url =
  "https://protected-temple-21445.herokuapp.com/delivery_agent_profile/view_single_profile";
export const RiderContext = createContext();
export const userContext = createContext();

export const UseTokenProviderUser = (props) => {
  const [phone_no, setPhone_no] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  // const userToken = useMemo(() => ({ token, setToken }), [token, setToken]);
  const [id, setId] = useState("");
  // const userId = useMemo(() => ({ id, setId }), [id, setId]);

  // let token;
  let idU;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://protected-temple-21445.herokuapp.com/user_auth/login",
        {
          method: "POST",

          body: JSON.stringify({
            phone_no: phone_no,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();
      // setId();
      // setToken(data.token);
      // idU = data.token;

      // console.log(data);

      if (res.status === 200) {
        setMessage("User created successfully");
        setToken(data.token);
        setId(data.user._id);
        localStorage.setItem("id", data.user._id);
        // console.log(idU);
      } else {
        setMessage("Error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const userToken = token;
  // const userId = id;

  const userValues = {
    handleLoginSubmit,
    message,
    phone_no,
    setPhone_no,
    setMessage,
    token,
  };
  return (
    <userContext.Provider value={userValues}>
      {props.children}
    </userContext.Provider>
  );
};

export const UseRiderProvider = (props) => {
  const { loading, riderdata } = useFetch(url);
  const values = {
    riderdata,
    loading,
  };

  return (
    <RiderContext.Provider value={values}>
      {/* <SideBar/> */}
      {props.children}
    </RiderContext.Provider>
  );
};
