import React, { useContext, useRef, useState, useEffect } from "react";
import "./requestpickup.css";
import { Link, useNavigate } from "react-router-dom";
import Map from "../../../Shadow/javascripts/Map";
// import GoogleMap from "../../../Shadow/javascripts/GoogleMap";
import { useLocation } from "react-router-dom";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import { Autocomplete, Marker } from "@react-google-maps/api";
import Locate from "../../Images/locate.png";

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
  // console.log(new Date().getTime());
  // console.log(Date.now());

  const location = useLocation();
  const vehicle = location.state.vehicle;
  const member = location.state.member;

  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_profile/user_profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBlNjdiODQ1M2EzNzIyMjc1N2I3OGMiLCJwaG9uZV9ubyI6IisyMzQ4MTU3NTQyODIwIiwiaWF0IjoxNjYxODg4NDUzfQ.ZcLApAMCMxmo17pp17Bu9nJ0d_G_vvkhfZekLrrkjis",
        }),
      }
    );
    const data = await res.json();
    // console.log(results);
    setUserDetails(data?.user);
    // console.log(data);
  };
  const name = userDetails.fullname;
  const number = userDetails.phone_no;
  const email = userDetails.email;

  useEffect(() => {
    fetchUserDetails();
  }, []);

  /**@type React.MutableRefObject<HTMLInputElement> */
  const pickupRef = useRef();
  /**@type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const calculateRoute = async () => {
    if (pickupRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
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

          // const pLoc = results[0].geometry.location.toString().slice(1, -1);
          const piLoc = results[0].geometry.location.lat();
          const piiLoc = results[0].geometry.location.lng();
          // console.log(piLoc);
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
    setDuration(results.routes[0].legs[0].duration.text);
    // console.log(results.routes[0].legs[0]);

    const userDistance = results.routes[0].legs[0].distance.text;
    const realDistance = parseFloat(userDistance);
    // console.log(destinationRef.current.value, pickupRef.current.value, vehicle);
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_delivery/delivery_price",
        {
          method: "POST",

          body: JSON.stringify({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBlNjdiODQ1M2EzNzIyMjc1N2I3OGMiLCJwaG9uZV9ubyI6IisyMzQ4MTU3NTQyODIwIiwiaWF0IjoxNjYxODg4NDUzfQ.ZcLApAMCMxmo17pp17Bu9nJ0d_G_vvkhfZekLrrkjis",
            pickup_location: pickupRef.current.value,
            drop_off_location: destinationRef.current.value,
            distance: realDistance,
            delivery_medium: vehicle,
            delivery_duration: 23,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );

      const data = await res.json();
      if (res.status === 200) {
        // console.log(data.price);
        setPrice(parseInt(data.price));
        // console.log(pickupLocation);
        // console.log(dropLocation);
      } else {
        setMessage("Error occured");
      }
    } catch (error) {
      console.log(error);
    }
    setButtonName("Clear Route");
  };

  const clearRoute = () => {
    setDirection(null);
    setDistance("");
    setDuration("");
    pickupRef.current.value = "";
    destinationRef.current.value = "";
    setButtonName("Calculate Route");
    setPrice("");
  };
  console.log(duration);

  const handleNavigate = () => {
    const realDistance = parseFloat(distance);
    const deliveryState = pickupState;
    const pickLocation = pickupLocation;
    const dropOffLocation = dropLocation;
    const pickup_address = pickupRef.current.value;
    const drop_off_address = destinationRef.current.value;

    if (buttonName === "Clear Route") {
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
              email: email,
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
              email: email,
            },
          });
    }
  };

  const handleRoute = () => {
    buttonName === "Calculate Route" ? calculateRoute() : clearRoute();
  };

  return (
    <section className="user-dashboard">
      <div className="user-right-side-1">
        <div className="map-container-1">
          <Map
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
          <p id="price-p">&#8358;{price !== "" ? price : "0.00"}</p>
        </div>

        <div id="div-button">
          <button className="set-location-btn-1" onClick={handleRoute}>
            {buttonName}
          </button>

          <button
            className={
              buttonName === "Calculate Route"
                ? "set-location-btn-2"
                : "set-location-btn-1"
            }
            onClick={handleNavigate}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
