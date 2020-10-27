import React from 'react';

import Cell from 'components/layout/cell';

import BedOptions from './bed_options';
import Description from './description';
import RoomAvailability from './room_availability';
import RoomFacilities from './room_facilities';
import RoomTitle from './room_title';

import styles from './room_info.module.css';

export default function RoomInfo({ roomType }) {
  const { availability, bedOptions, facilities, description } = roomType;

  return (
    <Cell className={styles.roomContainer}>
      <RoomTitle room={roomType} />
      <Description description={description} />
      <RoomAvailability availability={availability} />
      <BedOptions bedOptions={bedOptions} />
      <RoomFacilities facilities={facilities} />
    </Cell>
  );
}
