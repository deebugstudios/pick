import React, { useMemo, useState } from "react";
import "../css/map.css";
import {
  GoogleMap,
  Marker,
  Circle,
  MarkerClusterer,
  Autocomplete,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import Close from "../../components/Images/close.png";
import { type } from "@testing-library/user-event/dist/type";

const Map = (props) => {
  const [map, setMap] = useState(/** @type google.maps.map */ (null));
  const juve = new google.maps.LatLng(6.3352435, 5.625857700000001); //eslint-disable-line
  const center = useMemo(() => juve, []);
  const option = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  return (
    <div>
      {/* <div className='controls-container'>
        <div className='controls'>
            <Autocomplete>
            <input type="text" placeholder='pickup location'/>
            </Autocomplete>
            <br />
            <Autocomplete>
            <input type="text" placeholder='deliver location'/>
            </Autocomplete>
             <button onClick={()=> map.panto(center)}>pan to</button> 
        </div> 
    </div>*/}
      <div className="map">
        <GoogleMap
          zoom={18}
          center={center}
          mapContainerClassName="map-container"
          options={option}
          onLoad={(map) => setMap(map)}
        >
          {props.direct && <DirectionsRenderer directions={props.direct} />}
          {props.mark && (
            <Marker
              position={props.mark}
              icon={props.src}
              title={props.title}
            />
          )}
          <Marker position={center} />

          <Circle center={center} radius={500} options={closeOption} />
        </GoogleMap>
      </div>
    </div>
  );
};
const defaultOption = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visable: true,
};
const closeOption = {
  ...defaultOption,
  fillOpacity: 0.05,
  strokeColor: "rgb(0,222,0)",
  fillColor: "rgb(0,222,0)",
};
export default Map;
