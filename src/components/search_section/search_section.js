import React, { useContext, useEffect, useState } from 'react';
import { useMedia } from 'react-media';

import { BookingActionsContext, BookingDataContext } from 'containers/data_context';

import MEDIA_QUERIES from 'constants/media_queries';

import DateSelect from './date_select';
import MinPricePanel from './min_price_panel';
import MobileSummary from './mobile_summary';
import OccupancySetting from './occupancy_settings';
import Summary from './summary';

import styles from './search_section.module.css';

export default function SearchSection() {
  const [propertyRoomsById, setPropertyRoomsById] = useState(null);
  const [selectedRatesByRoom, setSelectedRatesByRoom] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const { params, property, roomsInfo } = useContext(BookingDataContext);
  const { setParams, loadRoomsInfo } = useContext(BookingActionsContext);
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const isMobile = matchedQueries.xs || matchedQueries.sm || matchedQueries.md;
  const { data: propertyRooms, isLoading } = roomsInfo;
  const { ratesOccupancyPerRoom, currency } = params;

  // TODO update search params onChange handling, set query params here, not in input components;

  useEffect(function buildRoomsById() {
    if (!propertyRooms) {
      return;
    }

    const updatedRoomsById = propertyRooms.reduce((roomsById, room) => {
      const updatedRatePlans = room.ratePlans.reduce((ratesById, rate) => {
        return { ...ratesById, [rate.id]: rate };
      }, {});

      return { ...roomsById, [room.id]: { ...room, ratePlans: updatedRatePlans } };
    }, {});

    setPropertyRoomsById(updatedRoomsById);
  }, [propertyRooms]);

  useEffect(function setSummaryParams() {
    if (!propertyRoomsById || !ratesOccupancyPerRoom) {
      return;
    }

    let newTotalPrice = 0;
    const newSelectedRatesByRoom = {};

    Object.keys(ratesOccupancyPerRoom).forEach((roomId) => {
      Object.keys(ratesOccupancyPerRoom[roomId]).forEach((rateId) => {
        const amount = ratesOccupancyPerRoom[roomId][rateId];
        const room = propertyRoomsById[roomId];
        const rate = room.ratePlans[rateId];

        const ratePrice = Number(rate.totalPrice);

        if (amount) {
          const selectedRate = { ...rate, amount };
          const newRoom = { ...room, selectedRates: [], total: 0 };
          const { [room.id]: selectedRoom = newRoom } = newSelectedRatesByRoom;

          selectedRoom.selectedRates.push(selectedRate);
          selectedRoom.total += amount * ratePrice;

          newSelectedRatesByRoom[selectedRoom.id] = selectedRoom;

          newTotalPrice += ratePrice * amount;
        }
      });
    });

    setTotalPrice(newTotalPrice);
    setSelectedRatesByRoom(newSelectedRatesByRoom);
  }, [propertyRoomsById, ratesOccupancyPerRoom]);

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
            onSearch={loadRoomsInfo}
          />
        </div>
      </div>
    </div>
  );
}
