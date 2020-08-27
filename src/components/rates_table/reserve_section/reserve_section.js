import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import ReserveSectionDetails from './reserve_section_details';
import ReserveSectionTotal from './reserve_section_total';

import styles from './reserve_section.module.css';

export default function ReserveSection({ isMobile, isRatePlansPresent, ratesOccupancyPerRoom, propertyRooms, currency, onClick }) {
  const [occupiedRoomsNumber, setOccupiedRoomsNumber] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [propertyRoomsById, setRoomsById] = useState(null);
  const { t } = useTranslation();

  const containerClasses = [styles.reserveSectionContainer];
  const buttonClasses = [styles.reserveButton];
  const buttonText = isRatePlansPresent ? t('rates_table:reserve') : t('rates_table:show_prices');

  useEffect(function buildRoomsById() {
    const updatedRoomsById = propertyRooms.reduce((roomsById, room) => {
      const updatedRatePlans = room.ratePlans.reduce((ratesById, rate) => ({...ratesById, [rate.id]: rate}), {});

      return {...roomsById, [room.id]: { ...room, ratePlans: updatedRatePlans } };
    }, {});

    setRoomsById(updatedRoomsById);
  }, [propertyRooms]);

  useEffect(function handleRatesOccupancyChange() {
    if (!propertyRoomsById) {
      return;
    }

    let newTotalPrice = 0;
    let newOccupiedRoomsNumber = 0;

    Object.keys(ratesOccupancyPerRoom).forEach((roomId) => {
      Object.keys(ratesOccupancyPerRoom[roomId]).forEach((rateId) => {
        const selectedRateAmount = ratesOccupancyPerRoom[roomId][rateId];
        const ratePrice = Number(propertyRoomsById[roomId].ratePlans[rateId].price); 

        newTotalPrice += ratePrice * selectedRateAmount;
        newOccupiedRoomsNumber += selectedRateAmount;
      });
    });

    setOccupiedRoomsNumber(newOccupiedRoomsNumber);
    setTotalPrice(newTotalPrice);
  }, [ratesOccupancyPerRoom, propertyRooms, propertyRoomsById, setOccupiedRoomsNumber, setTotalPrice]);

  if (isMobile) {
    containerClasses.push(styles.reserveSectionContainerMobile);
    buttonClasses.push(styles.reserveButtonMobile);
  }

  return (
    <div className={containerClasses.join(' ')}>
      {!isMobile && <div className={styles.reserveSectionHeader} />}
      <div className={styles.reserveSectionBody}>
        <ReserveSectionTotal
          currency={currency}
          occupiedRoomsNumber={occupiedRoomsNumber}
          total={totalPrice}
        />
        <Button
          className={buttonClasses.join(' ')}
          disabled={!occupiedRoomsNumber}
          onClick={onClick}
        >
          {buttonText}
        </Button>
        {!isMobile && <ReserveSectionDetails />}
      </div>
    </div>
  );
}