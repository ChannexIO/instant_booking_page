import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import HeaderSearch from "components/header_search";
import PropertiesList from "components/properties_list";
import PropertiesSearchMap from "components/properties_search_map";
import PropertyPreview from "components/property_preview";

import { SearchActionsContext, SearchDataContext } from "containers/data_context";
import getBookingParamsFromUrl from "containers/data_context/utils/get_booking_params_from_url";

import dateFormatter from "utils/date_formatter";
import setUrlParams from "utils/set_url_params";

import styles from "./search_page.module.css";

const DEBOUNCE_MAP_TIME = 1000;

export default function SearchPage() {
  const [selectProperty, setSelectProperty] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const history = useHistory();
  const { loadPropertiesList } = useContext(SearchActionsContext);
  const { properties } = useContext(SearchDataContext);
  const { data: propertiesData, isLoading } = properties;

  const onSearch = useCallback(
    (requestParams) => {
      const { mapCoordinates, ...restParams } = requestParams;

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

      const formattedDates = {
        checkinDate: dateFormatter.toApi(restParams.checkinDate),
        checkoutDate: dateFormatter.toApi(restParams.checkoutDate),
      };

      loadPropertiesList({ ...restParams, ...formattedDates }, filter);
    },
    [loadPropertiesList],
  );

  useEffect(
    function initParamsFromUrl() {
      if (searchParams) {
        return;
      }

      const newSearchParams = getBookingParamsFromUrl();

      setSearchParams(newSearchParams);
      onSearch(newSearchParams);
    },
    [searchParams, onSearch],
  );

  const handleCoordinatesChange = _.debounce(({ marginBounds }) => {
    const newSearchParams = { ...searchParams, mapCoordinates: marginBounds };

    setSearchParams(newSearchParams);
    setUrlParams({ mapCoordinates: marginBounds }, history);

    if (!searchParams.mapCoordinates) {
      return;
    }

    onSearch(newSearchParams);
  }, DEBOUNCE_MAP_TIME);

  const onClearSelectProperty = useCallback(() => {
    setSelectProperty(null);
  }, [setSelectProperty]);

  const handleDatesChange = useCallback(
    ({ startDate, endDate }) => {
      const newSearchParams = {
        ...searchParams,
        checkinDate: startDate,
        checkoutDate: endDate,
      };

      setSearchParams(newSearchParams);

      if (startDate && endDate) {
        const formattedDates = {
          checkinDate: dateFormatter.toApi(startDate),
          checkoutDate: dateFormatter.toApi(endDate),
        };

        setUrlParams(formattedDates, history);
      }

      if (endDate) {
        onSearch(newSearchParams);
      }
    },
    [history, onSearch],
  );

  const handleChangeOccupancy = useCallback(
    (value, name) => {
      const newSearchParams = { ...searchParams, [name]: value };

      setUrlParams({ [name]: value }, history);

      setSearchParams(newSearchParams);
      onSearch(newSearchParams);
    },
    [onSearch, history],
  );

  if (!searchParams) {
    return null;
  }

  return (
    <div>
      <HeaderSearch
        searchParams={searchParams}
        handleDatesChange={handleDatesChange}
        handleChangeOccupancy={handleChangeOccupancy}
      />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <PropertiesList
            loading={isLoading}
            properties={propertiesData}
            onSelectProperty={setSelectProperty}
          />
        </div>
        <div className={styles.right}>
          {selectProperty && (
            <PropertyPreview
              property={selectProperty}
              onClearSelectProperty={onClearSelectProperty}
            />
          )}

          <PropertiesSearchMap
            properties={propertiesData}
            onChangeCallback={handleCoordinatesChange}
            onSelectProperty={setSelectProperty}
          />
        </div>
      </div>
    </div>
  );
}
