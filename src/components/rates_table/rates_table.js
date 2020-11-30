import React, { useCallback, useContext, useEffect } from 'react';
import moment from 'moment';

import LoadingContainer from 'components/loading_container';

import { BookingActionsContext, BookingDataContext } from 'containers/data_context';

import RatesTableHeader from './rates_table_header';
import RoomType from './room_type';

import styles from './rates_table.module.css';

const DEFAULT_OCCUPANCY_PER_ROOM = {};

export default function RatesTable() {
  const { roomsInfo, params } = useContext(BookingDataContext);
  const { setParams } = useContext(BookingActionsContext);
  const {
    ratesOccupancyPerRoom = DEFAULT_OCCUPANCY_PER_ROOM,
    currency,
    checkinDate,
    checkoutDate,
    adults,
    children,
  } = params;
  const { data: roomsData, isLoading } = roomsInfo;
  const isCheckinDateValid = checkinDate && moment(checkinDate).isValid();
  const isCheckoutDateValid = checkoutDate && moment(checkoutDate).isValid();
  const isEnteredDatesValid = isCheckinDateValid && isCheckoutDateValid;
  const residenceTime = isEnteredDatesValid
    ? checkoutDate.diff(checkinDate, 'days')
    : null;

  const setRatesOccupancyPerRoom = useCallback((updatedOccupancy) => {
    setParams({ ...params, ratesOccupancyPerRoom: updatedOccupancy });
  }, [params, setParams]);

  useEffect(function resetSelectedRates() {
    if (!roomsData) {
      return;
    }

    const isAllSelectedRatesPresent = Object.keys(ratesOccupancyPerRoom)
      .every((roomId) => {
        const room = roomsData.find((roomEntry) => roomEntry.id === roomId);

        if (!room) {
          return false;
        }

        return Object.keys(ratesOccupancyPerRoom[roomId])
          .every((rateId) => {
            return room.ratePlans.find((rate) => rate.id === rateId);
          });
      });

    if (!isAllSelectedRatesPresent) {
      setRatesOccupancyPerRoom(DEFAULT_OCCUPANCY_PER_ROOM);
    }
  }, [roomsData, ratesOccupancyPerRoom, setRatesOccupancyPerRoom]);

  if (!Array.isArray(roomsData)) {
    return null;
  }

  return (
    <LoadingContainer loading={isLoading}>
      <div className={styles.tableContainer}>
        <RatesTableHeader
          residenceTime={residenceTime}
          propertyRooms={roomsData}
        />
        {roomsData && roomsData.map((roomType, rowIndex) => (
          <RoomType
            roomType={roomType}
            currency={currency}
            rowIndex={rowIndex}
            checkinDate={checkinDate}
            adultsOccupancy={adults}
            childrenOccupancy={children}
            key={roomType.id}
            ratesOccupancyPerRoom={ratesOccupancyPerRoom}
            onRatesOccupancyChange={setRatesOccupancyPerRoom}
          />
        ))}
      </div>
    </LoadingContainer>
  );
}
