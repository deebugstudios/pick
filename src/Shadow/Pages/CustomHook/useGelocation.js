import React, {useState, useEffect} from 'react'

export const useGelocation = () => {
    const [riderLocation, setRiderLocation] = useState({
        loaded: false,
        coordinates: {lat: '', lng: ""}
    })

    const onSuccess = (location) => {
        setRiderLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        })
    }
    const onError = (error) => {
        setRiderLocation({
            loaded: true,
            error,
        })
    }
    useEffect(() => {
        if(!("gelocation" in navigator)) {
            onError({
                code: 0,
                message: 'Geolocation Not Supported'
            })
            setRiderLocation(state => ({
                ...state,
                loaded: true,
            }))
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, []);
  return riderLocation
}
