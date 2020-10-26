import React, { useContext, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
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
  const [selectedRatesList, setSelectedRatesList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { params, property, roomsInfo } = useContext(BookingDataContext);
  const { setParamsAndLoadRoomsInfo } = useContext(BookingActionsContext);
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const isMobile = matchedQueries.xs || matchedQueries.sm || matchedQueries.md;
  const { data: propertyRooms } = roomsInfo;
  const { ratesOccupancyPerRoom, currency } = params;

  //TODO update search params onChange handling, set query params here, not in input components;

  useEffect(function buildRoomsById() {
    if (!propertyRooms) {
      return;
    }

    const updatedRoomsById = propertyRooms.reduce((roomsById, room) => {
      const updatedRatePlans = room.ratePlans.reduce((ratesById, rate) => ({ ...ratesById, [rate.id]: rate }), {});

      return { ...roomsById, [room.id]: { ...room, ratePlans: updatedRatePlans } };
    }, {});

    setPropertyRoomsById(updatedRoomsById);
  }, [propertyRooms]);

  useEffect(function setSummaryParams() {
    if (!propertyRoomsById || !ratesOccupancyPerRoom) {
      return;
    }

    let newTotalPrice = 0;
    const newSelectedRatesList = [];

    Object.keys(ratesOccupancyPerRoom).forEach((roomId) => {
      Object.keys(ratesOccupancyPerRoom[roomId]).forEach((rateId) => {
        const amount = ratesOccupancyPerRoom[roomId][rateId];
        const room = propertyRoomsById[roomId];
        const rate = room.ratePlans[rateId];

        const ratePrice = Number(rate.totalPrice);

        if (amount) {
          newSelectedRatesList.push({
            room,
            rate,
            amount,
          });

          newTotalPrice += ratePrice * amount;
        }
      });
    });

    setTotalPrice(newTotalPrice);
    setSelectedRatesList(newSelectedRatesList);
  }, [propertyRoomsById, ratesOccupancyPerRoom]);

  return (
    <div className={styles.stickyContainer}>
      <div className={styles.searchPanelWrapper}>
        <MinPricePanel property={property} params={params} />
        <div className={styles.searchSection}>
          <DateSelect bookingParams={params} handleSearchChange={setParamsAndLoadRoomsInfo} />
          <OccupancySetting bookingParams={params} handleSearchChange={setParamsAndLoadRoomsInfo} />
          {isMobile
            ? <MobileSummary selectedRatesList={selectedRatesList} totalPrice={totalPrice} currency={currency}/>
            : <Summary selectedRatesList={selectedRatesList} totalPrice={totalPrice} currency={currency}/>
          }
        </div>
      </div>
    </div>
  );
}
