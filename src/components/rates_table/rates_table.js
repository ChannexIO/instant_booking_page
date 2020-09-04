import React, { useState, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { useMedia } from 'react-media';

import MEDIA_QUERIES from 'constants/media_queries';

import RoomType from './room_type';
import RatesTableHeader from './rates_table_header';
import ReserveSection from './reserve_section';

import styles from './rates_table.module.css';

export default function RatesTable({ currency, propertyRooms, residenceTime, adults, children }) {
  const [ratesOccupancyPerRoom, setRatesOccupancyPerRoom] = useState({});

  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const isMobile = matchedQueries.xs || matchedQueries.sm || matchedQueries.md;
  const tableClasses = [styles.ratesTable];
  const tableContainerClasses = [styles.tableContainer];
  const isRatePlansPresent = Object.values(propertyRooms).some((room) => Array.isArray(room.ratePlans));

  const handleRatesOccupancyChange = useCallback((updatedRatesOccupany) => {
    setRatesOccupancyPerRoom(updatedRatesOccupany);
  }, [setRatesOccupancyPerRoom]);

  if (isMobile) {
    tableClasses.push(styles.ratesTableMobile);
    tableContainerClasses.push(styles.tableContainerMobile);
  }
  
  return (
    <div className={tableContainerClasses.join(' ')}>
      <Table className={tableClasses.join(' ')} striped bordered>
        <RatesTableHeader residenceTime={residenceTime} propertyRooms={propertyRooms} isMobile={isMobile} />
        <tbody>
          {propertyRooms.map((roomType, rowIndex) => (
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
              onRatesOccupancyChange={handleRatesOccupancyChange}
            />
          ))}
        </tbody>
      </Table>
      <ReserveSection
        currency={currency}
        isMobile={isMobile}
        propertyRooms={propertyRooms}
        ratesOccupancyPerRoom={ratesOccupancyPerRoom}
        isRatePlansPresent={isRatePlansPresent}
        adults={adults}
        children={children}
      />
    </div>
  );
}