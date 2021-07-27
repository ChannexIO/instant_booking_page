import React, { useCallback, useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import _ from "lodash";

import HeaderSearch from "components/header_search";
import PropertiesList from "components/properties_list";
import PropertiesSearchMap from "components/properties_search_map";
import PropertyPreview from "components/property_preview";

import { AppDataContext, SearchActionsContext, SearchDataContext } from "containers/data_context";

import routes from "routing/routes";

import { DEFAULT_CURRENCY } from "constants/defaults";
import dateFormatter from "utils/date_formatter";
import getBookingParamsFromUrl from "utils/get_booking_params_from_url";
import { encodeMapParams } from "utils/map_params";
import setUrlParams from "utils/set_url_params";

import styles from "./search_page.module.css";

const DEBOUNCE_MAP_TIME = 1000;

export default function SearchPage() {
  const { featureFlags } = useContext(AppDataContext);
  const [selectProperty, setSelectProperty] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [highlightedProperties, setHighlightedProperties] = useState({});
  const history = useHistory();
  const { loadPropertiesList } = useContext(SearchActionsContext);
  const { properties } = useContext(SearchDataContext);
  const { data: propertiesData, isLoading } = properties;

  const onSearch = useCallback(
    _.debounce((requestParams) => {
      const { mapCoordinates, ...restParams } = requestParams;

      const filter = { ...mapCoordinates };

      const formattedDates = {
        checkinDate: dateFormatter.toApi(restParams.checkinDate),
        checkoutDate: dateFormatter.toApi(restParams.checkoutDate),
      };

      loadPropertiesList({ ...restParams, ...formattedDates }, filter);
    }, DEBOUNCE_MAP_TIME),
    [loadPropertiesList],
  );

  useEffect(
    function initParamsFromUrl() {
      if (searchParams) {
        return;
      }

      const parsedParams = getBookingParamsFromUrl();
      const activeCurrency = parsedParams.currency || DEFAULT_CURRENCY;

      const newSearchParams = { ...parsedParams, currency: activeCurrency };
      setSearchParams(newSearchParams);
      onSearch(newSearchParams);
    },
    [searchParams, onSearch],
  );

  const handleCoordinatesChange = (marginBounds) => {
    const isSameLocation = _.isEqual(marginBounds, searchParams.mapCoordinates);
    const newSearchParams = { ...searchParams, mapCoordinates: marginBounds };
    const mapCoordinates = encodeMapParams(marginBounds);

    if (isSameLocation) {
      return;
    }

    setSearchParams(newSearchParams);
    setUrlParams({ mapCoordinates }, history);

    onSearch(newSearchParams);
  };

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
    [searchParams, history, onSearch],
  );

  const handleChangeOccupancy = useCallback(
    (value, name) => {
      const newSearchParams = { ...searchParams, [name]: value };

      setUrlParams({ [name]: value }, history);
      setSearchParams(newSearchParams);
      onSearch(newSearchParams);
    },
    [searchParams, onSearch, history],
  );

  const handleCurrencyChange = useCallback(
    (currency) => {
      const newSearchParams = { ...searchParams, currency };

      setUrlParams({ currency }, history);
      setSearchParams(newSearchParams);
      onSearch(newSearchParams);
    },
    [searchParams, onSearch, history],
  );

  const handlePropertyHighlight = useCallback(
    (item) => {
      setHighlightedProperties({ ...highlightedProperties, [item.id]: true });
    },
    [highlightedProperties],
  );

  const handlePropertyShadow = useCallback(
    (item) => {
      setHighlightedProperties({ ...highlightedProperties, [item.id]: false });
    },
    [highlightedProperties],
  );

  if (!searchParams) {
    return null;
  }

  if (!featureFlags.searchPageIsActive) {
    return <Redirect to={routes.homePage} />;
  }

  return (
    <div>
      <HeaderSearch
        searchParams={searchParams}
        handleDatesChange={handleDatesChange}
        handleCurrencyChange={handleCurrencyChange}
        handleChangeOccupancy={handleChangeOccupancy}
      />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <PropertiesList
            loading={isLoading}
            currency={searchParams.currency}
            properties={propertiesData}
            onSelectProperty={setSelectProperty}
            highlightedProperties={highlightedProperties}
            onPropertyMouseOver={handlePropertyHighlight}
            onPropertyMouseOut={handlePropertyShadow}
          />
        </div>
        <div className={styles.right}>
          {selectProperty && (
            <PropertyPreview
              currency={searchParams.currency}
              property={selectProperty}
              onClearSelectProperty={onClearSelectProperty}
            />
          )}

          <PropertiesSearchMap
            defaultBounds={searchParams.mapCoordinates}
            properties={propertiesData}
            onChangeCallback={handleCoordinatesChange}
            onSelectProperty={setSelectProperty}
            highlightedProperties={highlightedProperties}
            onMarkerMouseOver={handlePropertyHighlight}
            onMarkerMouseOut={handlePropertyShadow}
          />
        </div>
      </div>
    </div>
  );
}
