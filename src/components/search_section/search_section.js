import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useMedia } from 'react-media';
import { useHistory } from 'react-router-dom';

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
  const { ratesOccupancyPerRoom, currency } = params;

  // TODO update search params onChange handling, set query params here, not in input components;
  const handleBook = useCallback(() => {
    saveDataToStorage();

    const paymentPagePath = buildPath(history, routes.paymentPage, { channelId });

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

  const SummaryComponent = isMobile ? MobileSummary : Summary;

  return (
    <div className={styles.stickyContainer}>
      <div className={styles.searchPanelWrapper}>
        <MinPricePanel property={property} params={params} />
        <div className={styles.searchSection}>
          <DateSelect bookingParams={params} handleSearchChange={setParams} />
          <OccupancySetting bookingParams={params} handleSearchChange={setParams} />
          <SummaryComponent
            selectedRatesByRoom={selectedRatesByRoom}
            totalPrice={totalPrice}
            currency={currency}
            loading={isLoading}
            onBook={handleBook}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}
