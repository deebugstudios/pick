import React,{useState, useEffect, useContext} from "react";
import { PendingDeliveryList } from "../../Details info/PendingDeliveryList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./deliveryhistory.css";
import { DeliveryHistoryList } from "../../Details info/DeliveryHistoryList";
import { useNavigate } from "react-router-dom";
import { RiderContext } from "../../Contexts/RiderContext";
import ClipLoader from "react-spinners/ClipLoader";
import { NoTransaction } from "../../NoTransactionpage/NoTransaction";

const DeliveryHistory = () => {
  const [loading, setLoading] = useState(true);
  const [deliveryHistory, setDeliveryHistory] = useState([{}])
  const [searchItem, setSearchItem] = useState("")
  const [pageCount, setPageCount] = useState(1)
  // const navigate = useNavigate();
  const value = useContext(RiderContext);
 const { token, riderdata } = value;
 console.log(token, riderdata)
 console.log(riderdata?.fleet_manager_code)
  // const fetchDeliveryHistory = async() => {
  //       const res = await fetch( "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_delivery/view_delivery_history", 
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           pagec: 1,
  //           token: JSON.parse(token),
  //           // fleet_manager_code: riderdata?.fleet_manager_code
  //         })
  
  //       });
  //       const data = await res.json();
  //       if(res.status === 200){
  //         setLoading(false)
  //         console.log(data)
  //         setDeliveryHistory(data?.deliveries);
  //       }else {
  //         console.log("some error")
  //         setLoading(false)
  //       }
  //   }


    const fetchDeliveryHistoryAgent = async() => {
      const res = await fetch( "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_delivery/view_delivery_history", 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pagec: pageCount,
          token: JSON.parse(token),
          // fleet_manager_code: riderdata?.fleet_manager_code
        })

      });
      const data = await res.json();
      if(res.status === 200){
        setLoading(false)
        setDeliveryHistory(data?.deliveries);
      }else {
        console.log("some error")
        setLoading(false)
      }
  }


  const fetchDeliveryHistoryFleet = async() => {
    const res = await fetch( "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_delivery/view_delivery_history", 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pagec: pageCount,
        token: JSON.parse(token),
         fleet_manager_code: riderdata?.fleet_manager_code
      })

    });
    const data = await res.json();
    if(res.status === 200){
      setLoading(false)
      console.log(data)
      setDeliveryHistory(data?.deliveries);
    }else {
      console.log("some error")
      setLoading(false)
    }
}
      // const newListItems = deliveryHistory.map(list => {
      //   return list
      // })
      //   console.log(newListItems?._id);

    useEffect(()=> {
      if(riderdata?.delivery_agent_type === "delivery agent"){
        fetchDeliveryHistoryAgent()
      }else{
        fetchDeliveryHistoryFleet()
      }

    },[pageCount])

    const navigate = useNavigate()
const minusPagec =()=> {
  if(pageCount <= 1){
    return
  }else {
    setPageCount(prev => prev - 1)
  }
}
const addPagec =()=> {
  if(!deliveryHistory?.length) return
  setPageCount(prev => prev + 1)
}


    const historyItems = deliveryHistory?.filter((value)=> {
      if (value == ""){
        return value
      }else if (value.parcel_name?.toLowerCase().includes(searchItem.toLocaleLowerCase())){
        return value
      }
    })?.map((dobj)=> (
      <DeliveryHistoryList key={dobj?._id} parcelname={dobj?.parcel_name} parcelcode={dobj?.parcel_code} deliverytype={dobj?.delivery_type} deliveryimage={dobj?.imgs?.[0]}  click={
        dobj.delivery_type === "instant" || dobj.delivery_type === "scheduled"
          ? () => {
              navigate("/deliveryhistorydetails", {
                state: { id: dobj._id },
              });
            }
          : null
      }/>
      ))
      // const handleClear =()=> {
      //   setSearchItem("")
      // }
      // console.log(dobj.parcel_name);
  return (
    <section className="iiii">
      <div className="history-wrapper">
        <>
        <div className="search-box-container">
          <input type="text" placeholder="Nike Boots" className="search-box" onChange={(event)=> setSearchItem(event.target.value)}/>
        {/* <button onClick={handleClear}>  <FontAwesomeIcon icon={faTimes} className="times-icon"/>
        </button> */}
        </div>
        {loading ? 
        (
          <div style={{display: "flex", justifyContent: "center", alignItems:"center"}}> 
          <ClipLoader color={"#1AA803"} loading={loading}  size={100} />
          </div>
        ):
        (
          <>
       {deliveryHistory ? 
       (
          <>
        {historyItems}
        <div className="pending-delivery-pickup-entries">
          <h6>
            Showing <span>1</span> to <span>{deliveryHistory?.length}</span> of <span>30</span> entries
          </h6>
          <div>
            <FontAwesomeIcon icon={faAngleLeft} className={pageCount <= 1 ? "icon-space-less" : "icon-space"} onClick={minusPagec} />{" "}
            <h6>View more</h6>
            <FontAwesomeIcon icon={faAngleRight} className="icon-space" onClick={addPagec}/>
          </div>
        </div>
        </>
       ):
       (
        <>
        <NoTransaction/>
        <div className="pending-delivery-pickup-entries">
        {deliveryHistory ? 
        (
          <h6>   Showing <span>1</span> to <span>{deliveryHistory?.length}</span> of <span>30</span> entries </h6>
        ): 
        (
          ""
        ) }
         
          <div>
            <FontAwesomeIcon icon={faAngleLeft} className={pageCount <= 1 ? "icon-space-less" : "icon-space"} onClick={minusPagec} />{" "}
            <h6>View more</h6>
            <FontAwesomeIcon icon={faAngleRight} className={!deliveryHistory?.length ? "icon-space-less" : "icon-space"} onClick={addPagec}/>
          </div>
        </div>
        </>
       )
       } 
        </>
        )
        }
        {/* <DeliveryHistoryList/> */}
       
        </>
      </div>
    </section>
  );
};

export default DeliveryHistory;
