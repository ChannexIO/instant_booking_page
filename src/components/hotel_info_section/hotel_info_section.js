import React from 'react';

import SeparatorLine from "components/separator_line";

import HotelInfo from "./hotel_info";
import HotelFacilities from "./hotel_facilities";

export default function HotelInfoSection({ property }) {
  const { description, facilities, title } = property;


  return (
    <>
      <HotelInfo description={description} />
      <SeparatorLine />
      <HotelFacilities title={title} facilities={facilities} />
    </>    
  )
}