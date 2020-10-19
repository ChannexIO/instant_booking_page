import React, { useCallback } from 'react';
import GoogleMapReact from 'google-map-react';

const DEFAULT_ZOOM = 13;

export default function Map({ location }) {
  const handleMapLoading = useCallback(({ map, maps }) => {
    const newMarker = new maps.Marker({
      position: location,
      map,
    });

    return newMarker;
  }, [location]);

  const initMapOptions = useCallback((maps) => {
    return {
      zoomControlOptions: {
        position: maps.ControlPosition.TOP_LEFT,
      },
    };
  }, []);

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        options={initMapOptions}
        center={location}
        zoom={DEFAULT_ZOOM}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleMapLoading}
       />
    </div>
  );
}
