import React, { useEffect, useRef, useState } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';

const TomTomMap = () => {
  const mapElement = useRef();
  const mapRef = useRef(null);
  const [clickedCoords, setClickedCoords] = useState(null);

  useEffect(() => {
    const initMap = () => {
      mapRef.current = tt.map({
        key: process.env.REACT_APP_TOM_TOM_MAPS_API_KEY,
        container: mapElement.current,
        center: [-66.12988659967587, -17.378823993636875],
        zoom: 13
      });

      mapRef.current.on('click', (event) => {
        const { lng, lat } = event.lngLat;
        setClickedCoords({ lng, lat });
      });
    }

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div>
      <div ref={mapElement} className="mapDiv" style={{ height: '400px' }}></div>
      {clickedCoords && (
        <p>Clicked location: Longitude: {clickedCoords.lng.toFixed(6)}, Latitude: {clickedCoords.lat.toFixed(6)}</p>
      )}
    </div>
  );
};

export default TomTomMap;