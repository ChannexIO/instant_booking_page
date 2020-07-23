import React from "react";

import PhotoSlider from "components/photo_slider";

export default function HotelPage({ property }) {
  return (
    <div>
      <PhotoSlider property={property} />
    </div>
  )
}