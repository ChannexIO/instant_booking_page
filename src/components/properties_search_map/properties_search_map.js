import React, { useCallback, useEffect, useMemo, useState } from "react";
import GoogleMapReact from "google-map-react";

import Marker from "./marker";

const BOOTSTRAP_URL_KEYS = { key: process.env.REACT_APP_GOOGLE_MAP_KEY };
const DEFAULT_ZOOM = 1;
const DEFAULT_CENTER = { lat: 51.496644, lng: -0.147614 };

const MAP_SIZE = {
  width: "100%",
  height: "100%",
};

const BOUND_PADDING = 0;

const getMapBounds = (maps, points) => {
  const bounds = new maps.LatLngBounds();

  points.forEach(([latitude, longitude]) => {
    bounds.extend(new maps.LatLng(latitude, longitude));
  });

  return bounds;
};

const getPropertiesBounds = (maps, properties) => {
  const points = properties.map(({ latitude, longitude }) => {
    return [Number(latitude), Number(longitude)];
  });

  return getMapBounds(maps, points);
};

const getDefaultBounds = (maps, bounds) => {
  const points = Object.values(bounds).map(({ lat, lng }) => {
    return [lat, lng];
  });

  return getMapBounds(maps, points);
};

const getCoords = (map) => {
  const bounds = map.getBounds();
  const coords = {
    ne: {
      lat: bounds.getNorthEast().lat(),
      lng: bounds.getNorthEast().lng(),
    },
    sw: {
      lat: bounds.getSouthWest().lat(),
      lng: bounds.getSouthWest().lng(),
    },
  };

  return coords;
};

export default function PropertiesSearchMap({
  properties,
  defaultBounds,
  onChangeCallback,
  onSelectProperty,
}) {
  const [mapInstance, setMapInstance] = useState(null);

  const onGoogleApiLoaded = useCallback(
    (newMapInstance) => {
      if (defaultBounds) {
        const bounds = getDefaultBounds(newMapInstance.maps, defaultBounds);

        newMapInstance.map.fitBounds(bounds, BOUND_PADDING);
      }

      setMapInstance(newMapInstance);
    },
    [defaultBounds],
  );

  useEffect(() => {
    if (!mapInstance || !properties || defaultBounds) {
      return;
    }

    const bounds = getPropertiesBounds(mapInstance.maps, properties);

    mapInstance.map.fitBounds(bounds, BOUND_PADDING);
  }, [mapInstance, defaultBounds, properties]);

  const handleDragEnd = useCallback(
    (map) => {
      const coords = getCoords(map);

      onChangeCallback(coords);
    },
    [onChangeCallback],
  );

  const handleZoomChanged = useCallback(() => {
    if (!mapInstance || !defaultBounds) {
      return;
    }

    const coords = getCoords(mapInstance.map);

    onChangeCallback(coords);
  }, [mapInstance, defaultBounds, onChangeCallback]);

  const markers = useMemo(
    () =>
      properties?.map((item, index) => {
        const { latitude, longitude } = item;

        return (
          <Marker
            key={index}
            lat={Number(latitude)}
            lng={Number(longitude)}
            item={item}
            handleSelectProperty={onSelectProperty}
          />
        );
      }),
    [properties, onSelectProperty],
  );

  return (
    <div style={{ height: MAP_SIZE.height, width: MAP_SIZE.width }}>
      <GoogleMapReact
        bootstrapURLKeys={BOOTSTRAP_URL_KEYS}
        onGoogleApiLoaded={onGoogleApiLoaded}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        yesIWantToUseGoogleMapApiInternals
        onDragEnd={handleDragEnd}
        onZoomAnimationEnd={handleZoomChanged}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
}
