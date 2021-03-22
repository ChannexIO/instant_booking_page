import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useMedia } from 'react-media';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { BookingActionsContext, BookingDataContext } from 'containers/data_context';

import routes from 'routing/routes';

import MEDIA_QUERIES from 'constants/media_queries';
import buildPath from 'utils/build_path';
import calculateSummaryParams from 'utils/calculate_summary_params';

import DateSelect from './date_select';
import MinPricePanel from './min_price_panel';
import MobileSummary from './mobile_summary';
import OccupancySetting from './occupancy_settings';
import Summary from './summary';

import styles from './search_section.module.css';

export default function SearchSection() {
  const [selectedRatesByRoom, setSelectedRatesByRoom] = useState({});
  const [missingSpaces, setMissingSpaces] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { channelId, params, property, roomsInfo } = useContext(BookingDataContext);
  const {
    setParams,
    loadRoomsInfo,
    saveDataToStorage,
    clearDataFromStorage,
  } = useContext(BookingActionsContext);
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const history = useHistory();
  const isMobile = matchedQueries.xs || matchedQueries.sm || matchedQueries.md;
  const { data: propertyRooms, isLoading } = roomsInfo;
  const { data: propertyData } = property;
  const {
    ratesOccupancyPerRoom,
    currency,
    checkinDate = null,
    checkoutDate = null,
    adults,
    children,
  } = params;
  const isRateSelected = Boolean(Object.keys(selectedRatesByRoom).length);
  const isDatesSelected = moment(checkinDate).isValid() && moment(checkoutDate).isValid();

  const handleBook = useCallback(() => {
    saveDataToStorage();

    const paymentPagePath = buildPath(history.location.search, routes.paymentPage, { channelId });

    history.push(paymentPagePath);
  }, [saveDataToStorage, history, channelId]);

  const handleSearch = useCallback(() => {
    clearDataFromStorage();
    loadRoomsInfo();
  }, [loadRoomsInfo, clearDataFromStorage]);

  useEffect(function setSummaryParams() {
    const summaryParams = calculateSummaryParams(propertyRooms, ratesOccupancyPerRoom);

    if (!summaryParams) {
      return;
    }

    setTotalPrice(summaryParams.total);
    setSelectedRatesByRoom(summaryParams.selectedRatesByRoom);
  }, [propertyRooms, ratesOccupancyPerRoom]);

  useEffect(function calculateMissingSpaces() {
    let availableSpaces = 0;

    Object.values(selectedRatesByRoom).forEach((room) => {
      room.selectedRates.forEach((rate) => {
        const { amount, occupancy } = rate;

        availableSpaces += amount * occupancy.adults;
      });
    });

    const missingAdults = adults - availableSpaces;

    const newMissingSpaces = missingAdults > 0 ? missingAdults : 0;

    setMissingSpaces(newMissingSpaces);
  }, [selectedRatesByRoom, adults, children]);

  const SummaryComponent = isMobile ? MobileSummary : Summary;
  const wrapperClasses = [styles.searchPanelWrapper];

  if (!propertyData.photos.length) {
    wrapperClasses.push(styles.searchPanelNoOffset);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.stickyContainer}>
        <div className={wrapperClasses.join(' ')}>
          <MinPricePanel
            channelId={channelId}
            params={params}
          />
          <div className={styles.searchSection}>
            <DateSelect bookingParams={params} handleSearchChange={setParams} />
            <OccupancySetting bookingParams={params} handleSearchChange={setParams} />
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
