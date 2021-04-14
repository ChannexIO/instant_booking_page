import React, { useCallback, useMemo } from "react";
import GoogleMapReact from "google-map-react";

import styles from "./properties_search_map.module.css";

const BOOTSTRAP_URL_KEYS = { key: process.env.REACT_APP_GOOGLE_MAP_KEY };
const DEFAULT_ZOOM = 1;
const DEFAULT_CENTER = { lat: 51.496644, lng: -0.147614 };

const mapSize = {
  width: "100%",
  height: "100vh",
};

const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    const { latitude, longitude } = place;
    bounds.extend(new maps.LatLng(Number(latitude), Number(longitude)));
  });
  return bounds;
};

const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, "idle", () => {
    maps.event.addDomListener(window, "resize", () => {
      map.fitBounds(bounds, mapSize);
    });
  });
};

const apiIsLoaded = (map, maps, places) => {
  const bounds = getMapBounds(map, maps, places);
  map.fitBounds(bounds, mapSize);

  bindResizeListener(map, maps, bounds);
};

const Marker = ({ item }) => <div className={styles.marker}>{item.best_offer}</div>;

export default function PropertiesSearchMap({ properties, onChangeCallback }) {
  const onGoogleApiLoaded = useCallback(
    ({ map, maps }) => {
      if (!properties || properties.length === 0) {
        return;
      }

      apiIsLoaded(map, maps, properties);
    },
    [properties],
  );

  return (
    <div style={{ height: mapSize.height, width: mapSize.width }}>
      <GoogleMapReact
        bootstrapURLKeys={BOOTSTRAP_URL_KEYS}
        onGoogleApiLoaded={onGoogleApiLoaded}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        yesIWantToUseGoogleMapApiInternals
        onChange={onChangeCallback}
      >
        {useMemo(
          () =>
            properties?.map((item, index) => {
              const { latitude, longitude } = item;
              return (
                <Marker key={index} lat={Number(latitude)} lng={Number(longitude)} item={item} />
              );
            }),
          [properties],
        )}
      </GoogleMapReact>
    </div>
  );
}
