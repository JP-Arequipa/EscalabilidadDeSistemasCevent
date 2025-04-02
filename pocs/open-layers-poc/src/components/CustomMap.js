import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileJSON from 'ol/source/TileJSON';
import { fromLonLat, toLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import Attribution from 'ol/control/Attribution';

const CustomMap = () => {
  const mapElement = useRef();
  const mapRef = useRef(null);
  const [clickedCoords, setClickedCoords] = useState(null);

  useEffect(() => {
    const source = new TileJSON({
      url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${process.env.REACT_APP_OPENLAYERS_MAPS_API_KEY}`,
      tileSize: 512,
      crossOrigin: 'anonymous'
    });

    const attribution = new Attribution({
      collapsible: false,
    });

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: source
        })
      ],
      controls: defaultControls({attribution: false}).extend([attribution]),
      view: new View({
        constrainResolution: true,
        center: fromLonLat([-66.12988659967587, -17.378823993636875]),
        zoom: 14
      })
    });

    map.on('click', function(evt) {
      const coords = toLonLat(evt.coordinate);
      setClickedCoords(coords);
    });

    mapRef.current = map;

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div>
      <div ref={mapElement} style={{ width: '100%', height: '400px' }}></div>
      {clickedCoords && (
        <p>Clicked location: Longitude: {clickedCoords[0].toFixed(6)}, Latitude: {clickedCoords[1].toFixed(6)}</p>
      )}
    </div>
  );
};

export default CustomMap;