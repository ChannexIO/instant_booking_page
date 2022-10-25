import React, { useCallback, useContext, useEffect, useState } from "react";
import { useMedia } from "react-media";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { BookingActionsContext, BookingDataContext } from "containers/data_context";

import routes from "routing/routes";

import MEDIA_QUERIES from "constants/media_queries";
import buildPath from "utils/build_path";
import calculateSummaryParams from "utils/calculate_summary_params";

import DateSelect from "./date_select";
import MinPricePanel from "./min_price_panel";
import MobileSummary from "./mobile_summary";
import OccupancySetting from "./occupancy_settings";
import Summary from "./summary";

import styles from "./search_section.module.css";

export default function SearchSection() {
  const [selectedRatesByRoom, setSelectedRatesByRoom] = useState({});
  const [missingSpaces, setMissingSpaces] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const bookingData = useContext(BookingDataContext);
  const { channelId, params, property, roomsInfo, bestOffer } = bookingData;
  const { setParams, loadRoomsInfo, saveDataToStorage, clearDataFromStorage } = useContext(
    BookingActionsContext,
  );
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const history = useHistory();
  const isMobile = matchedQueries.xs || matchedQueries.sm || matchedQueries.md;
  const { data: propertyRooms, isLoading } = roomsInfo;
  const { data: propertyData } = property;

  const { ratesOccupancyPerRoom, currency, checkinDate, checkoutDate, adults, children } = params;

  const isRateSelected = Boolean(Object.keys(selectedRatesByRoom).length);
  const isDatesSelected = moment(checkinDate).isValid() && moment(checkoutDate).isValid();

  const handleBook = useCallback(() => {
    saveDataToStorage(bookingData);

    const paymentPagePath = buildPath(history.location.search, routes.paymentPage, { channelId });

    history.push(paymentPagePath);
  }, [bookingData, saveDataToStorage, history, channelId]);

  const handleSearch = useCallback(() => {
    clearDataFromStorage();
    loadRoomsInfo(channelId, params);
  }, [channelId, params, loadRoomsInfo, clearDataFromStorage]);

  const handleSearchChange = useCallback((params) => {
    clearDataFromStorage();
    params.ratesOccupancyPerRoom = {};
    setParams(params);
  }, [clearDataFromStorage, setParams]);

  useEffect(
    function setSummaryParams() {
      const summaryParams = calculateSummaryParams(propertyRooms, ratesOccupancyPerRoom);

      if (!summaryParams) {
        return;
      }

      setTotalPrice(summaryParams.total);
      setSelectedRatesByRoom(summaryParams.selectedRatesByRoom);
    },
    [propertyRooms, ratesOccupancyPerRoom],
  );

  useEffect(
    function calculateMissingSpaces() {
      let availableAdultSpaces = 0;
      let availableChildSpaces = 0;

      Object.values(selectedRatesByRoom).forEach((room) => {
        room.selectedRates.forEach((rate) => {
          const { amount, occupancy } = rate;

          availableAdultSpaces += amount * occupancy.adults;
          availableChildSpaces += amount * occupancy.children + amount * occupancy.infants;
        });
      });

      const missingAdults = adults - availableAdultSpaces;
      const missingChildren = children - availableChildSpaces - (availableAdultSpaces - adults);

      const newMissingSpaces = (missingAdults > 0 || missingChildren > 0) ? missingAdults + missingChildren : 0;

      setMissingSpaces(newMissingSpaces);
    },
    [selectedRatesByRoom, adults, children],
  );

  const SummaryComponent = isMobile ? MobileSummary : Summary;
  const wrapperClasses = [styles.searchPanelWrapper];

  if (!propertyData.photos.length) {
    wrapperClasses.push(styles.searchPanelNoOffset);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.stickyContainer}>
        <div className={wrapperClasses.join(" ")}>
          <MinPricePanel bestOffer={bestOffer} params={params} />
          <div className={styles.searchSection}>
            <DateSelect bookingParams={params} handleSearchChange={handleSearchChange} />
            <OccupancySetting bookingParams={params} handleSearchChange={handleSearchChange} />
            <SummaryComponent
              selectedRatesByRoom={selectedRatesByRoom}
              bookingParams={params}
              isDatesSelected={isDatesSelected}
              isRateSelected={isRateSelected}
              totalPrice={totalPrice}
              missingSpaces={missingSpaces}
              currency={currency}
              loading={isLoading}
              onBook={handleBook}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
