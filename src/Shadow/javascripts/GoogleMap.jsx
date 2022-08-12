import { useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import React from "react";
import Map from "./Map";
function GoogleMap() {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  //   libraries: ["places"],
  // });
  // if (!isLoaded) return <h3>loading map...</h3>;
  return <Map />;
  //
  //     }
  //     return (
  //    <Map/>

  //)
}
export default GoogleMap;
