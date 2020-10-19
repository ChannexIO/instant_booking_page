import React from 'react';

import BedOptions from './bed_options';
import RoomAvailability from './room_availability';
import RoomFacilities from './room_facilities';
import RoomTitle from './room_title';

export default function RoomInfo({ roomType, isMobile }) {
  const { ratePlans, availability, bedOptions, facilities } = roomType;
  const ratesNumber = !isMobile && ratePlans.length ? ratePlans.length : 1;

  return (
    <td rowSpan={ratesNumber}>
      <RoomTitle room={roomType} />
      <RoomAvailability availability={availability} />
      <BedOptions bedOptions={bedOptions} />
      <RoomFacilities facilities={facilities} />
    </td>
  );
}
