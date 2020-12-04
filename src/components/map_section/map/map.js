import React, { useCallback, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const DEFAULT_ZOOM = 13;

const parseLocationCoords = ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return null;
  }

  return {
    lat: Number(latitude),
    lng: Number(longitude),
  };
};

export default function Map({ location }) {
  const [parsedLocation, setParsedLocation] = useState(null);

  const handleMapLoading = useCallback(({ map, maps }) => {
    const newMarker = new maps.Marker({
      position: parsedLocation,
      map,
    });

    return newMarker;
  }, [parsedLocation]);

  const initMapOptions = useCallback((maps) => {
    return {
      zoomControlOptions: {
        position: maps.ControlPosition.TOP_LEFT,
      },
    };
  }, []);

  useEffect(function initLocation() {
    const newParsedLocation = parseLocationCoords(location);

    setParsedLocation(newParsedLocation);
  }, [location]);

  if (!parsedLocation) {
    return null;
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        options={initMapOptions}
        center={parsedLocation}
        zoom={DEFAULT_ZOOM}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleMapLoading}
       />
    </div>
  );
}
