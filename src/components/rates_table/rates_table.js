import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useMedia } from 'react-media';

import LoadingContainer from 'components/loading_container';

import { BookingDataContext } from 'containers/data_context';

import MEDIA_QUERIES from 'constants/media_queries';

import RatesTableHeader from './rates_table_header';
import ReserveSection from './reserve_section';
import RoomType from './room_type';

import styles from './rates_table.module.css';

export default function RatesTable({ currency, residenceTime, adults, children }) {
  const [ratesOccupancyPerRoom, setRatesOccupancyPerRoom] = useState({});
  const { roomsInfo } = useContext(BookingDataContext);
  const { data: roomsData, isLoading } = roomsInfo;

  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const isMobile = matchedQueries.xs || matchedQueries.sm || matchedQueries.md;
  const tableClasses = [styles.ratesTable];
  const tableContainerClasses = [styles.tableContainer];
  const isRatePlansPresent = roomsData && roomsData.some((room) => room.ratePlans?.length);

  useEffect(function resetSelectedRates() {
    setRatesOccupancyPerRoom({});
  }, [roomsData]);

  if (isMobile) {
    tableClasses.push(styles.ratesTableMobile);
    tableContainerClasses.push(styles.tableContainerMobile);
  }

  if (!Array.isArray(roomsData)) {
    return null;
  }

  return (
    <LoadingContainer loading={isLoading}>
      <div className={tableContainerClasses.join(' ')}>
        <div>
          <Table className={tableClasses.join(' ')} striped bordered>
            <RatesTableHeader residenceTime={residenceTime} propertyRooms={roomsData} isMobile={isMobile} />
            <tbody>
              {roomsData && roomsData.map((roomType, rowIndex) => (
                <RoomType
                  roomType={roomType}
                  currency={currency}
                  rowIndex={rowIndex}
                  isMobile={isMobile}
                  adults={adults}
                  children={children}
                  key={roomType.id}
                  residenceTime={residenceTime}
                  ratesOccupancyPerRoom={ratesOccupancyPerRoom}
                  onRatesOccupancyChange={setRatesOccupancyPerRoom}
                />
              ))}
            </tbody>
          </Table>
        </div>
        <ReserveSection
          currency={currency}
          isMobile={isMobile}
          propertyRooms={roomsData}
          ratesOccupancyPerRoom={ratesOccupancyPerRoom}
          isRatePlansPresent={isRatePlansPresent}
          adults={adults}
          children={children}
        />
      </div>
    </LoadingContainer>
  );
}
