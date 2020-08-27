import React from 'react';

import RoomTitle from './room_title';
import RoomAvailability from './room_availability';
import BedOptions from './bed_options';
import RoomFacilities from './room_facilities';

export default function RoomInfo({ roomType, isMobile }) {
  const { title, ratePlans, availability, bedOptions, facilities } = roomType;
  const ratesNumber = !isMobile && ratePlans ? ratePlans.length : 1;



  return (
    <td rowSpan={ratesNumber}>
      <RoomTitle room={roomType} />
      <RoomAvailability availability={availability} />
      <BedOptions bedOptions={bedOptions} />
      <RoomFacilities facilities={facilities} />
    </td>
  );
}