import React from "react";
import { Container } from "react-bootstrap";

import Header from "components/header";
import SeparatorLine from "components/separator_line";
import PhotoSlider from "components/photo_slider";
import SearchSection from "components/search_section";
import HotelInfoSection from "components/hotel_info_section";
import HotelRatesSection from "components/hotel_rates_section";

import styles from "./hotel_page.module.css";

export default function HotelPage({ property }) {
  return (
    <div>
      <div className={styles.firstScreen}>
        <Container>
          <Header property={property} />
        </Container>
        <PhotoSlider property={property} />
        <Container>
          <SearchSection property={property} />
        </Container>
      </div>
      <Container>
        <SeparatorLine />
        <HotelInfoSection property={property} />
        <SeparatorLine />
        {/* <HotelRatesSection property={property} /> */}
      </Container>
    </div>
  )
}