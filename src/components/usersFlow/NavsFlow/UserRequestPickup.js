import React, { useContext, useRef, useState, useEffect } from "react";
import "./requestpickup.css";
import { Link, useNavigate } from "react-router-dom";
import Map from "../../../Shadow/javascripts/Map";
// import GoogleMap from "../../../Shadow/javascripts/GoogleMap";
import { useLocation } from "react-router-dom";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import { Autocomplete, Marker } from "@react-google-maps/api";
import Locate from "../../Images/locate.png";
import { ClipLoader } from "react-spinners";
import GoogleMap from "../../../Shadow/javascripts/GoogleMap";
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
} from "firebase/firestore";
import { db } from "../../../utils/firebase";

export default function UserRequestPickup() {
  const [distance, setDistance] = useState("");
  const [direction, setDirection] = useState(null);
  const [duration, setDuration] = useState("");
  const [buttonName, setButtonName] = useState("Calculate Route");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [pickupState, setPickupState] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadButton, setLoadButton] = useState(false);
  const userValues = useContext(userContext);
  const { token, userName, email, userNumber, userImg } = userValues;
  // console.log(new Date().getTime());
  // console.log(Date.now());

  const location = useLocation();
  const vehicle = location.state.vehicle;
  const member = location.state.member;

  const navigate = useNavigate();

  const name = JSON.parse(userName);
  const number = JSON.parse(userNumber);
  const Useremail = JSON.parse(email);

  /**@type React.MutableRefObject<HTMLInputElement> */
  const pickupRef = useRef();
  /**@type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  function reverseString(str) {
    return str.split("").reverse().join("");
  }

  /**
   * @param {string | number}
   */

  function groupDigital(num) {
    const emptyStr = "";
    const group_regex = /\d{3}/g;

    // delete extra comma by regex replace.
    const trimComma = (str) => str.replace(/^[,]+|[,]+$/g, emptyStr);

    const str = num + emptyStr;
    const [integer, decimal] = str.split(".");

    const conversed = reverseString(integer);

    const grouped = trimComma(
      reverseString(conversed.replace(/\d{3}/g, (match) => `${match},`))
    );

    return !decimal ? grouped : `${grouped}.${decimal}`;
  }

  const calculateRoute = async () => {
    if (pickupRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    setLoadButton(true);
    const directionService = new google.maps.DirectionsService(); // eslint-disable-line
    const results = await directionService.route({
      origin: pickupRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING, // eslint-disable-line
    });
    setDirection(results);

    const geocoder = new google.maps.Geocoder(); // eslint-disable-line
    const pickupLatLng = await geocoder.geocode(
      { address: pickupRef.current.value },
      function (results, status) {
        if (status == "OK") {
          // console.log(results);
          results[0].address_components.map((item, index) => {
            if (item.types[0] == "administrative_area_level_1") {
              setPickupState(item.long_name);
            }
          });

          const pLoc = results[0].geometry.location.toString();
          const piLoc = results[0].geometry.location.lat();
          const piiLoc = results[0].geometry.location.lng();
          console.log(pLoc);
          setPickupLocation(`${piLoc},${piiLoc}`);
        }
      }
    );

    const dropOffLatLng = await geocoder.geocode(
      { address: destinationRef.current.value },
      function (results, status) {
        if (status == "OK") {
          // const dLoc = results[0].geometry.location.toString().slice(1, -1);
          const piLoc = results[0].geometry.location.lat();
          const piiLoc = results[0].geometry.location.lng();
          setDropLocation(`${piLoc},${piiLoc}`);
        }
      }
    );

    setDistance(results.routes[0].legs[0].distance.text);
    // setDuration(results.routes[0].legs[0].duration.text);
    const timeTaken = results.routes[0].legs[0].duration.text.replace(
      /\D/g,
      ""
    );
    console.log(timeTaken);
    const dura = Math.round(results.routes[0].legs[0].duration.value / 60);
    // console.log(dura);

    // console.log(results.routes[0].legs[0]);

    const userDistance = results.routes[0].legs[0].distance.text;
    //  parseFloat(userDistance);
    const realDistance = parseFloat(userDistance.replace(",", ""));
    // console.log(realDistance);

    // console.log(destinationRef.current.value, pickupRef.current.value, vehicle);
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_delivery/delivery_price",
        {
          method: "POST",

          body: JSON.stringify({
            token: JSON.parse(token),
            pickup_location: pickupRef.current.value,
            drop_off_location: destinationRef.current.value,
            distance: realDistance,
            delivery_medium: vehicle,
            delivery_duration: dura,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );

      const data = await res.json();
      if (res.status === 200) {
        setLoadButton(false);
        // console.log(data.price);
        setPrice(parseInt(data.price));
        // console.log(pickupLocation);
        // console.log(dropLocation);
      } else {
        setPrice("Error occured");
      }
    } catch (error) {
      // console.log(error);
    }
    setButtonName("Clear Route");
  };

  const clearRoute = () => {
    // console.log(pickupState);
    setDirection(null);
    setDistance("");
    setDuration("");
    pickupRef.current.value = "";
    destinationRef.current.value = "";
    setButtonName("Calculate Route");
    setPrice("");
  };
  // console.log(duration);

  const handleNavigate = () => {
    const realDistance = parseFloat(distance.replace(",", ""));
    const deliveryState = pickupState;
    const pickLocation = pickupLocation;
    const dropOffLocation = dropLocation;
    const pickup_address = pickupRef.current.value;
    const drop_off_address = destinationRef.current.value;

    if (price !== "") {
      member === "instant"
        ? navigate("/user/formuser", {
            state: {
              vehicle: vehicle,
              member: member,
              distance: realDistance,
              pickupLocation: pickLocation,
              pickupState: deliveryState,
              dropOffLocation: dropOffLocation,
              price: price,
              pickup_address: pickup_address,
              drop_off_address: drop_off_address,
              senderName: name,
              number: number,
              email: Useremail,
            },
          })
        : navigate("/user/select-a", {
            state: {
              vehicle: vehicle,
              member: member,
              distance: realDistance,
              pickupLocation: pickLocation,
              pickupState: deliveryState,
              dropOffLocation: dropOffLocation,
              price: price,
              pickup_address: pickup_address,
              drop_off_address: drop_off_address,
              senderName: name,
              number: number,
              email: Useremail,
            },
          });
    } else {
      return;
    }
  };

  const handleRoute = () => {
    buttonName === "Calculate Route" ? calculateRoute() : clearRoute();
  };

  const juve = new google.maps.LatLng(6.3352435, 5.625857700000001); //eslint-disable-line
  return (
    <section className="user-dashboard">
      <div className="user-right-side-1">
        <div className="request-div">
          <div className="map-container-1">
            <GoogleMap
              juve={juve}
              direct={direction}
              // {...marker.map()}
              // eslint-disable-next-line
              // mark={new google.maps.LatLng(6, 5)}
            />
          </div>
        </div>
        <div className="set-location-pickup-1">
          <div className="location-form">
            <div className="location-form-input" id="location-form-input-1">
              <label htmlFor="Pickup Location">Pickup Location</label>
              <div className="delivery-location-input">
                <img src={Locate} alt="" className="locate-icon" />
                <Autocomplete
                  options={{
                    componentRestrictions: { country: "ng" },
                  }}
                  // onLoad
                >
                  <input
                    name="Pickup Location"
                    placeholder="5 Noma Street GRA Edo State "
                    className="phone-input2"
                    ref={pickupRef}
                  />
                </Autocomplete>
              </div>
            </div>

            <Autocomplete
              options={{
                componentRestrictions: { country: "ng" },
              }}
            >
              <div className="location-form-input" id="location-form-input-2">
                <label htmlFor="Delivery Location">Delivery Location</label>
                <div className="delivery-location-input">
                  <img src={Locate} alt="" className="locate-icon" />
                  <input
                    name="Delivery Location"
                    placeholder="19 Akpakpava Road Benin City Ed.."
                    className="phone-input2"
                    ref={destinationRef}
                  />
                </div>
              </div>
            </Autocomplete>
          </div>
          <div id="price-div">
            <p>Delivery Fee </p>
            <p id="price-p">
              &#8358;{price !== "" ? groupDigital(price) : "0.00"}
            </p>
          </div>

          <div id="div-button">
            <button
              className={
                buttonName === "Calculate Route"
                  ? "set-location-btn-1"
                  : "set-location-btn-3"
              }
              onClick={handleRoute}
              disabled={loadButton}
            >
              <span>
                {loadButton ? (
                  <ClipLoader color={"black"} loading={loadButton} size={30} />
                ) : (
                  buttonName
                )}
              </span>
            </button>

            <button
              className={
                price !== "" ? "set-location-btn-1" : "set-location-btn-2"
              }
              onClick={handleNavigate}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
