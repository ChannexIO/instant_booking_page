import React from "react";

import PhotoSlider from "components/photo_slider";
import SearchSection from "components/search_section";

export default function HotelPage({ property }) {
  return (
    <div>
      <PhotoSlider property={property} />
      <SearchSection property={property} />
    </div>
  )
}