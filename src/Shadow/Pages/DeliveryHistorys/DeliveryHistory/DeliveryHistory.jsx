import React,{useState, useEffect} from "react";
import { PendingDeliveryList } from "../../Details info/PendingDeliveryList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./deliveryhistory.css";
import { DeliveryHistoryList } from "../../Details info/DeliveryHistoryList";
import { useNavigate } from "react-router-dom";
const DeliveryHistory = () => {
  const [loading, setLoading] = useState(true);
  const [deliveryHistory, setDeliveryHistory] = useState([{}])
  const [searchItem, setSearchItem] = useState("")
  // const navigate = useNavigate();

  const fetchDeliveryHistory = async() => {
        const res = await fetch( "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_delivery/view_delivery_history", 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pagec: 1,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNWZjYWU5ZDdkYTk1MzA4ZjI4YTgiLCJwaG9uZV9ubyI6IisyMzQ5MTUzNTQwMDIzIiwiaWF0IjoxNjU4NzQwNjgyfQ.Lf1I9AZLNRuY5Q3w7uOqQSGDRoKb5yUUe61LNpdQMUU"
          })
  
        });
        const data = await res.json();
        const results = await data
        setLoading(false)
        setDeliveryHistory(results?.deliveries);
    }
      // const newListItems = deliveryHistory.map(list => {
      //   return list
      // })
      //   console.log(newListItems?._id);

    useEffect(()=> {
      fetchDeliveryHistory()
    },[])

    const navigate = useNavigate()



    const historyItems = deliveryHistory?.filter((value)=> {
      if (value == ""){
        return value
      }else if (value.parcel_name?.toLowerCase().includes(searchItem.toLocaleLowerCase())){
        return value
      }
    }).map((dobj,index)=> (
      <DeliveryHistoryList index={index} parcelname={dobj?.parcel_name} parcelcode={dobj?.parcel_code} deliverytype={dobj?.delivery_type} deliveryimage={dobj?.imgs?.[0]}  click={
        dobj.delivery_type === "instant" || dobj.delivery_type === "scheduled"
          ? () => {
              navigate("/deliveryhistorydetails", {
                state: { id: dobj._id },
              });
            }
          : null
      }/>
      ))
      // console.log(dobj.parcel_name);
  return (
    <section className="user-dashboard pending-delivery specifics">
      <div className="history-wrapper">
        <div className="calender-container">
          <button className="calender">JULY 19, 2021</button>
        </div>
        <div className="search-box-container">
          <input type="text" placeholder="Nike Boots" className="search-box" onChange={(event)=> setSearchItem(event.target.value)}/>
        </div>
        {/* {deliveryHistory?.map(dobj=> (
        <DeliveryHistoryList parcelname={dobj.parcel_name} parcelcode={dobj.parcel_code} deliverytype={dobj.delivery_type} deliveryimage={dobj.imgs[0]} />
        ))} */}
        {historyItems}
        {/* <DeliveryHistoryList/> */}
        <div className="pending-delivery-pickup-entries">
          <h6>
            Showing <span>1</span> to <span>10</span> of <span>30</span> entries
          </h6>
          <div>
            <FontAwesomeIcon icon={faAngleLeft} className="icon-space" />{" "}
            <h6>View more</h6>
            <FontAwesomeIcon icon={faAngleRight} className="icon-space" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryHistory;
