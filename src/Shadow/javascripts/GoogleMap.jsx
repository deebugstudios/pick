import { useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import Map from "./Map";

const libraries = ["places"];
function GoogleMap(props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  if (!isLoaded) return <h3>loading map...</h3>;
  return <Map direct={props.direct} mark={props.mark} icon={props.src} />;
  //
  //     }
  //     return (
  //    <Map/>

  //)
}
export default GoogleMap;
