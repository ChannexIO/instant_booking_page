import React, { useCallback, useContext } from 'react';

import LoadingContainer from 'components/loading_container';

import { BookingActionsContext, BookingDataContext } from 'containers/data_context';

import RatesTableHeader from './rates_table_header';
import ReloadContainer from './reload_container';
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

  const setRatesOccupancyPerRoom = useCallback((updatedOccupancy) => {
    setParams({ ...params, ratesOccupancyPerRoom: updatedOccupancy });
  }, [params, setParams]);

  if (!Array.isArray(roomsData)) {
    return null;
  }

  return (
    <LoadingContainer loading={isLoading}>
      <ReloadContainer>
        <div className={styles.tableContainer}>
          <RatesTableHeader
            propertyRooms={roomsData}
            checkinDate={checkinDate}
            checkoutDate={checkoutDate}
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
      </ReloadContainer>
    </LoadingContainer>
  );
}
