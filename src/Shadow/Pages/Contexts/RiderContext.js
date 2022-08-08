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
import { createContext, useContext, useEffect, useState } from "react";
import SideBar from "../../javascripts/SideBar";
import { useFetch } from "../CustomHook/useFect";
const url =
  "https://guarded-falls-60982.herokuapp.com/delivery_agent_profile/view_single_profile";
export const RiderContext = createContext();

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
