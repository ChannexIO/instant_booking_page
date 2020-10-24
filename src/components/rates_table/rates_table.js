import React, { useCallback, useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useMedia } from 'react-media';

import LoadingContainer from 'components/loading_container';

import { BookingActionsContext, BookingDataContext } from 'containers/data_context';

import MEDIA_QUERIES from 'constants/media_queries';

import RatesTableHeader from './rates_table_header';
import RoomType from './room_type';

import styles from './rates_table.module.css';

const DEFAULT_OCCUPANCY_PER_ROOM = {};

export default function RatesTable({ currency, residenceTime, adults, children }) {
  const { roomsInfo, params } = useContext(BookingDataContext);
  const { setParams } = useContext(BookingActionsContext);
  const { data: roomsData, isLoading } = roomsInfo;
  const { ratesOccupancyPerRoom = DEFAULT_OCCUPANCY_PER_ROOM } = params;

  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const isMobile = matchedQueries.xs || matchedQueries.sm || matchedQueries.md;
  const tableClasses = [styles.ratesTable];
  const tableContainerClasses = [styles.tableContainer];

  const setRatesOccupancyPerRoom = useCallback((updatedOccupancy) => {
    setParams({ ...params, ratesOccupancyPerRoom: updatedOccupancy });
  }, [params, setParams]);

  useEffect(function resetSelectedRates() {
    const isAllSelectedRatesPresent = Object.keys(ratesOccupancyPerRoom)
      .every((roomId) => {
        const room = roomsData.find((room) => room.id === roomId);

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
        {/* <ReserveSection // TODO - remove if unused
          currency={currency}
          isMobile={isMobile}
          propertyRooms={roomsData}
          ratesOccupancyPerRoom={ratesOccupancyPerRoom}
          isRatePlansPresent={isRatePlansPresent}
          adults={adults}
          children={children}
        /> */}
      </div>
    </LoadingContainer>
  );
}
