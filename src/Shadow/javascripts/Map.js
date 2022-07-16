import React, { useMemo, useState } from 'react'
import '../css/map.css'
import {GoogleMap,Marker,Circle,MarkerClusterer, Autocomplete,} from '@react-google-maps/api'
import { type } from '@testing-library/user-event/dist/type'

const Map = () => {
    const [map, setMap]= useState(/** @type google.maps.map */ (null));
    const center = useMemo(()=>({lat: 6.3350, lng: 5.6037}), [])
    const option = useMemo(()=> ({
        disableDefaultUI: true,
        clickableIcons: false
    }),[])
    return (
    <div className='map-container'>
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
        <div className='map'>
            <GoogleMap zoom={18} 
             center={center}
             mapContainerClassName="map-container" 
             options={option}
             onLoad={(map)=> setMap(map)}>
             <Marker position={center} />
             <Circle center={center} radius={500} options={closeOption}/>
            </GoogleMap>
        </div>
    </div>
  )
}
const defaultOption = {
    strokeOpacity:0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visable: true
}
const closeOption = {
...defaultOption,
fillOpacity: 0.05,
strokeColor:"rgb(0,222,0)",
fillColor: "rgb(0,222,0)"
}
export default Map