import React from "react";

import PhotoSlider from "components/photo_slider";
import SearchSection from "components/search_section";
import HotelInfoSection from "components/hotel_info_section";

export default function HotelPage({ property }) {
  return (
    <div>
      <PhotoSlider property={property} />
      <SearchSection property={property} />
      <HotelInfoSection property={property} />
    </div>
  )
}