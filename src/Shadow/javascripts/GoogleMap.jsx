import { useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import Map from "./Map";

const libraries = ["places"];
function GoogleMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB5JNeyM3i2lzAbijlLqB9ZI0r8GIuTWPE",
    libraries,
  });
  if (!isLoaded) return <h3>loading map...</h3>;
  return <Map />;
  //
  //     }
  //     return (
  //    <Map/>

  //)
}
export default GoogleMap;
