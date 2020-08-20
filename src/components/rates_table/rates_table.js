import React, { useState, useCallback } from 'react';
import { Table } from "react-bootstrap";
import { useMedia } from "react-media";

import MEDIA_QUERIES from "constants/media_queries";

import RoomType from "./room_type";
import RatesTableHeader from './rates_table_header';
import ReserveSection from "./reserve_section";

import styles from "./rates_table.module.css";

export default function RatesTable({ currency, propertyRooms, residenceTime }) {
  const [ratesOccupancyPerRoom, setRatesOccupancyPerRoom] = useState({});
  const [isRateSelected, setIsRatesSelected] = useState(false);

  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const isMobile = matchedQueries.xs || matchedQueries.sm || matchedQueries.md;
  const tableClasses = [styles.ratesTable];
  const tableContainerClasses = [styles.tableContainer];
  const isRatePlansPresent = Object.values(propertyRooms).some((room) => Array.isArray(room.ratePlans));

  const handleRatesOccupancyChange = useCallback((updatedRatesOccupany) => {
    const hasSelectedRates = Object.values(updatedRatesOccupany).some((ratesOccupancies = {}) => {
      return Object.values(ratesOccupancies).some(Boolean);
    });

    setIsRatesSelected(hasSelectedRates);
    setRatesOccupancyPerRoom(updatedRatesOccupany);
  }, [setRatesOccupancyPerRoom, setIsRatesSelected]);

  if (isMobile) {
    tableClasses.push(styles.ratesTableMobile);
    tableContainerClasses.push(styles.tableContainerMobile);
  }
  
  return (
    <div className={tableContainerClasses.join(" ")}>
      <Table className={tableClasses.join(" ")} striped bordered hover>
        <RatesTableHeader residenceTime={residenceTime} propertyRooms={propertyRooms} isMobile={isMobile} />
        <tbody>
          {propertyRooms.map((roomType, rowIndex) => (
            <RoomType
              roomType={roomType}
              currency={currency}
              rowIndex={rowIndex}
              isMobile={isMobile}
              key={roomType.id}
              ratesOccupancyPerRoom={ratesOccupancyPerRoom}
              onRatesOccupancyChange={handleRatesOccupancyChange}
            />
          ))}
        </tbody>
      </Table>
      <ReserveSection isMobile={isMobile} isRateSelected={isRateSelected} isRatePlansPresent={isRatePlansPresent} onClick={console.log} />
    </div>
  );
}