import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import PropertiesList from "components/properties_list";
import PropertiesSearchMap from "components/properties_search_map";
import PropertyPreview from "components/property_preview";

import { SearchActionsContext, SearchDataContext } from "containers/data_context";

import getUrlParams from "utils/get_url_params";
import setUrlParams from "utils/set_url_params";

import styles from "./search_page.module.css";

export default function SearchPage() {
  const urlParams = getUrlParams();
  const history = useHistory();
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [selectProperty, setSelectProperty] = useState(null);

  const { properties } = useContext(SearchDataContext);
  const { loadPropertiesList } = useContext(SearchActionsContext);

  const { data: propertiesData, isLoading } = properties;

  const onSearch = useCallback(() => {
    let filter = {};

    if (mapCoordinates) {
      filter = {
        latitude: {
          lte: mapCoordinates.ne.lat,
          gte: mapCoordinates.sw.lat,
        },
        longitude: {
          lte: mapCoordinates.se.lng,
          gte: mapCoordinates.sw.lng,
        },
      };
    }

    loadPropertiesList(urlParams, filter);
  }, [mapCoordinates, loadPropertiesList, urlParams]);

  useEffect(() => {
    onSearch();
    // eslint-disable-next-line
  }, [mapCoordinates]);

  useEffect(() => {
    setUrlParams({ ...urlParams, ...mapCoordinates }, history);
    // eslint-disable-next-line
  }, [mapCoordinates, history]);

  const updateCoordinates = useCallback(
    ({ marginBounds }) => {
      setMapCoordinates(marginBounds);
    },
    [setMapCoordinates],
  );

  const onClearSelectProperty = useCallback(() => {
    setSelectProperty(null);
  }, [setSelectProperty]);

  return (
    <div className={styles.wrapper}>
      <PropertiesList
        loading={isLoading}
        properties={propertiesData}
        onSelectProperty={setSelectProperty}
      />
      <div className={styles.right}>
        {selectProperty && (
          <PropertyPreview
            property={selectProperty}
            onClearSelectProperty={onClearSelectProperty}
          />
        )}

        <PropertiesSearchMap properties={propertiesData} onChangeCallback={updateCoordinates} />
      </div>
    </div>
  );
}
