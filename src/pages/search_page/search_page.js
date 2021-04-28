import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import moment from "moment";

import HeaderSearch from "components/header_search";
import PropertiesList from "components/properties_list";
import PropertiesSearchMap from "components/properties_search_map";
import PropertyPreview from "components/property_preview";

import { SearchActionsContext, SearchDataContext } from "containers/data_context";

import DEFAULT_OCCUPANCY_PARAMS from "constants/default_occopancy_params";
import { DATE_API_FORMAT } from "constants/formats";
import dateFormatter from "utils/date_formatter";
import getUrlParams from "utils/get_url_params";
import setUrlParams from "utils/set_url_params";

import styles from "./search_page.module.css";

const DEBOUNCE_MAP_TIME = 1000;

export default function SearchPage() {
  const urlParams = getUrlParams();
  const history = useHistory();
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [selectProperty, setSelectProperty] = useState(null);

  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [occupancyParams, setOccupancyParams] = useState(DEFAULT_OCCUPANCY_PARAMS);

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

    const formattedDates = {
      checkin_date: dateFormatter.toApi(moment(urlParams.checkinDate, DATE_API_FORMAT)),
      checkout_date: dateFormatter.toApi(moment(urlParams.checkoutDate, DATE_API_FORMAT)),
    };

    loadPropertiesList({ ...urlParams, ...formattedDates }, filter);
  }, [mapCoordinates, loadPropertiesList, urlParams]);

  useEffect(() => {
    onSearch();
    // eslint-disable-next-line
  }, [mapCoordinates]);

  useEffect(() => {
    setUrlParams({ ...urlParams, ...mapCoordinates }, history);
  }, [mapCoordinates, history, urlParams]);

  useEffect(() => {
    const {
      checkinDate: checkinDateFromUrl,
      checkoutDate: checkoutDateFromUrl,
      adults: adultsFromUrl,
      children: childrenFromUrl,
      childrenAge: childrenAgeFromUrl,
    } = urlParams;

    if (adultsFromUrl || childrenFromUrl || childrenAgeFromUrl) {
      setOccupancyParams({
        adults: Number(adultsFromUrl),
        children: Number(childrenFromUrl),
        childrenAge: childrenAgeFromUrl ? childrenAgeFromUrl.split(",").map((i) => Number(i)) : [],
      });
    }
    if (checkinDateFromUrl) {
      setCheckinDate(moment(checkinDateFromUrl, DATE_API_FORMAT));
    }
    if (checkoutDateFromUrl) {
      setCheckoutDate(moment(checkoutDateFromUrl, DATE_API_FORMAT));
    }
    // eslint-disable-next-line
  }, [
    urlParams.checkinDate,
    urlParams.checkoutDate,
    urlParams.adults,
    urlParams.children,
    urlParams.childrenAge,
  ]);

  const updateCoordinates = _.debounce(({ marginBounds }) => {
    setMapCoordinates(marginBounds);
  }, DEBOUNCE_MAP_TIME);

  const onClearSelectProperty = useCallback(() => {
    setSelectProperty(null);
  }, [setSelectProperty]);

  const handleDatesChange = useCallback(
    ({ startDate, endDate }) => {
      setCheckinDate(startDate);
      setCheckoutDate(endDate);
      if (startDate && endDate) {
        const formattedDates = {
          checkinDate: dateFormatter.toApi(startDate),
          checkoutDate: dateFormatter.toApi(endDate),
        };
        setUrlParams({ ...urlParams, ...formattedDates }, history);
      }
      if (endDate) {
        onSearch();
      }
    },
    [history, onSearch, urlParams],
  );

  const handleChangeOccupancy = useCallback(
    (value, name) => {
      const params = { ...occupancyParams, [name]: value };
      setOccupancyParams(params);

      setUrlParams({ ...urlParams, ...params }, history);
      onSearch();
    },
    [occupancyParams, onSearch, history, urlParams],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <HeaderSearch
          checkinDate={checkinDate}
          checkoutDate={checkoutDate}
          handleDatesChange={handleDatesChange}
          occupancyParams={occupancyParams}
          handleChangeOccupancy={handleChangeOccupancy}
        />
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
          onChangeCallback={updateCoordinates}
          onSelectProperty={setSelectProperty}
        />
      </div>
    </div>
  );
}
