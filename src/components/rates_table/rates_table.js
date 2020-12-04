import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import moment from 'moment';

import LoadingContainer from 'components/loading_container';

import { BookingActionsContext, BookingDataContext } from 'containers/data_context';

import RatesTableHeader from './rates_table_header';
import ReloadContainer from './reload_container';
import RoomType from './room_type';

import styles from './rates_table.module.css';

const DEFAULT_OCCUPANCY_PER_ROOM = {};

export default function RatesTable() {
  const [isStale, setIsStale] = useState(false);
  const { roomsInfo, params } = useContext(BookingDataContext);
  const { setParams, loadRoomsInfo } = useContext(BookingActionsContext);

  const prevParamsRef = useRef(params);
  useEffect(() => {
    prevParamsRef.current = params;
  });
  const prevParams = prevParamsRef.current;

  const {
    ratesOccupancyPerRoom = DEFAULT_OCCUPANCY_PER_ROOM,
    currency,
    checkinDate = null,
    checkoutDate = null,
    adults,
    children,
  } = params;
  const { data: roomsData, isLoading } = roomsInfo;
  const isReloadDisabled = !moment(checkinDate).isValid() || !moment(checkoutDate).isValid();

  const setRatesOccupancyPerRoom = useCallback((updatedOccupancy) => {
    setParams({ ...params, ratesOccupancyPerRoom: updatedOccupancy });
  }, [params, setParams]);

  useEffect(function handleSearchParamsChange() {
    const isCheckinDateChanged = params.checkinDate !== prevParams.checkinDate;
    const isCheckoutDateChanged = params.checkoutDate !== prevParams.checkoutDate;

    if (isCheckinDateChanged || isCheckoutDateChanged) {
      setIsStale(true);
      setParams({ ...params, ratesOccupancyPerRoom: {} });
    }
  }, [params, prevParams, setParams]);

  useEffect(function handleRoomsInfoUpdate() {
    setIsStale(false);
  }, [roomsInfo]);

  if (!Array.isArray(roomsData)) {
    return null;
  }

  return (
    <LoadingContainer loading={isLoading}>
      <ReloadContainer disabled={isReloadDisabled} active={isStale} onRefresh={loadRoomsInfo}>
        <div className={styles.tableContainer}>
          <RatesTableHeader
            propertyRooms={roomsData}
            checkinDate={checkinDate}
            checkoutDate={checkoutDate}
          />
          {roomsData && roomsData.map((roomType, rowIndex) => (
            <RoomType
              disabled={isStale}
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
