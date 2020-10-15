import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import ReserveSectionTotal from './reserve_section_total';
import ReserveSectionMissingSpaces from './reserve_section_missing_spaces';

import styles from './reserve_section.module.css';

const getSpacesDeficit = (requiredAmount, availableAMount) => {
  return availableAMount < requiredAmount ? requiredAmount - availableAMount : 0;
};

export default function ReserveSection(props) {
  const { isMobile, isRatePlansPresent, ratesOccupancyPerRoom, propertyRooms, currency, children, adults, onClick } = props;
  const [occupiedRoomsNumber, setOccupiedRoomsNumber] = useState(0);
  const [missingSpaces, setMissingSpaces] = useState({});
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
        const ratePrice = Number(propertyRoomsById[roomId].ratePlans[rateId].totalPrice); 

        newTotalPrice += ratePrice * selectedRateAmount;
        newOccupiedRoomsNumber += selectedRateAmount;
      });
    });

    setOccupiedRoomsNumber(newOccupiedRoomsNumber);
    setTotalPrice(newTotalPrice);
  }, [ratesOccupancyPerRoom, propertyRooms, propertyRoomsById, setOccupiedRoomsNumber, setTotalPrice]);

  useEffect(function handleSpaceRequirimentsChange() {
    let selectedAdultsSpaces = 0;
    let selectedChildrenSpaces = 0;
    let selectedInfantSpaces = 0;

    Object.keys(ratesOccupancyPerRoom).forEach((roomId) => {
      Object.keys(ratesOccupancyPerRoom[roomId]).forEach((rateId) => {
        const selectedRateAmount = ratesOccupancyPerRoom[roomId][rateId];
        const rateOccupancy = propertyRoomsById[roomId].ratePlans[rateId].occupancy;

        selectedAdultsSpaces += Number(rateOccupancy.adults) * selectedRateAmount;
        selectedChildrenSpaces += Number(rateOccupancy.children) * selectedRateAmount;
        selectedInfantSpaces += Number(rateOccupancy.infants) * selectedRateAmount;
      });

    });
    
    const newMissingSpaces = {
      adults: getSpacesDeficit(adults, selectedAdultsSpaces),
      children: getSpacesDeficit(children, selectedChildrenSpaces),
    };

    setMissingSpaces(newMissingSpaces);
  }, [ratesOccupancyPerRoom, occupiedRoomsNumber, children, adults, propertyRoomsById]);

  if (isMobile) {
    containerClasses.push(styles.reserveSectionContainerMobile);
    buttonClasses.push(styles.reserveButtonMobile);
  }

  return (
    <div className={containerClasses.join(' ')}>
      {!isMobile && <div className={styles.reserveSectionHeader} />}
      <div className={styles.reserveSectionBody}>
        <ReserveSectionMissingSpaces
          missingSpaces={missingSpaces}
        />
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
      </div>
    </div>
  );
}