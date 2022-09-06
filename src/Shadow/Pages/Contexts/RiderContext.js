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
//         const res = await fetch("https://ancient-wildwood-73926.herokuapp.com/delivery_agent_profile/view_single_profile" , {
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
import { auth } from "../../../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const url =
  "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_profile/view_single_profile";
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
        "https://ancient-wildwood-73926.herokuapp.com/user_auth/login",
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
  // console.log(token)
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
  // const { loading, riderdata, token, code, agentId } = useFetch(url);
  const [sideBar, setSideBar] = useState(false);

  const [phone_no, setPhone_no] = useState("");
  // const [newNumber, setNewNumber] = ("")
  const [riderdata, setRiderData] = useState({});
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [dataError, setDataError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtp, setIsOtp] = useState(false);
  const [loadOtp, setLoadOtp] = useState(false);

  const token = localStorage.getItem("rubbish");
  const agentId = localStorage.getItem("agentId");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const number = "+234" + [phone_no];
    if (number === "") return
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
          callback: (response) => {
            // console.log(response);
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            handleSubmit();
          },
        },
        auth
      );
    } catch (err) {
      console.log("can't send Otp");
      console.log(err);
    }

    const appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);

    if (!phone_no) {
      setFormErrors("Phone Number must be filled!");
      setLoadOtp(false)
    } else setFormErrors("");

    try {
      setLoading(true);
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/login",
        {
          method: "POST",

          body: JSON.stringify({
            phone_no: number,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();
      // console.log(data);
      
      if (data.msg == "Account not active or delivery agent does not exist") {
        setDataError(data.msg);
        setLoadOtp(false)
        setTimeout(() => {
          setDataError("");
        }, 4000);
      }

      if (res.status === 200) {
        // console.log(data);
        signInWithPhoneNumber(auth, number, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoadOtp(true);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
        localStorage.setItem("rubbish", JSON.stringify(data?.token));
        localStorage.setItem(
          "agentId",
          JSON.stringify(data?.delivery_agent._id)
        );
        setRiderData(data?.delivery_agent);
        setLoading(false);
      } else {
        setMessage("An Error occured");
        console.log("An Error occured");
        setLoading(false);
        setLoadOtp(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtp = (event) => {
    event.preventDefault();
    let computedNum = otp;
    if (computedNum == 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(computedNum)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          // ...
          // navigate("/deliveryhistory")
          console.log("worked");
          console.log(user);
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...

          console.log("error");
          console.log(error);
        });
    }
  };

  console.log(token);
  const fetchData = async () => {
    if (token) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          delivery_agent_id: JSON.parse(agentId),
          token: JSON.parse(token),
        }),
      });
      const data = await res.json();
      const finalData = await data.delivery_agent;
      setLoading(false);
      setRiderData(finalData);
    }
  };
  useEffect(() => {
    if (token) {
      fetchData();
    }
    return () => {
      fetchData();
    };
  }, []);

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };
  // const {riderdata} = useFetch(url)

  // const token = localStorage.getItem("rubbish")
  const values = {
    sideBar,
    toggleSideBar,
    riderdata,
    loading,
    token,
    setOtp,
    formErrors,
    setPhone_no,
    message,
    isOtp,
    handleOtp,
    handleSubmit,
    phone_no,
    dataError,
    agentId,
    loadOtp,
    setLoadOtp,
  };

  return (
    <RiderContext.Provider value={values}>
      {/* <SideBar/> */}
      {props.children}
    </RiderContext.Provider>
  );
};
