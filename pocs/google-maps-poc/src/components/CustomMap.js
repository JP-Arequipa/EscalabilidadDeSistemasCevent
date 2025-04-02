import React, { useState } from "react";
import { Map, Marker, useMap } from "@vis.gl/react-google-maps";

//Map component using google maps
const CustomMap = () => {
  const [markerLocation, setMarkerLocation] = useState({
    lat: -17.378823993636875,
    lng: -66.12988659967587,
  });
  // Handle the click on the map, updating the location
  const MapClickHandler = () => {
    const map = useMap();
    
    React.useEffect(() => {
      if (!map) return;
      
      const clickListener = map.addListener("click", (e) => {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        setMarkerLocation({ lat: newLat, lng: newLng });
      });

      return () => {
        clickListener.remove();
      };
    }, [map]);

    return null;
  };

  return (
    <div className="map-container">
        <Map
          style={{ borderRadius: "20px" }}
          defaultZoom={13}
          defaultCenter={markerLocation}
          gestureHandling={"greedy"}
          disableDefaultUI
        >
          <MapClickHandler />
          <Marker position={markerLocation} />
        </Map>
      <div>Hello from  ({markerLocation.lat} latitude and {markerLocation.lng} longitude)</div>
    </div>
  );
}

export default CustomMap;