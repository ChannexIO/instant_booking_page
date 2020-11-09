import React, { useContext } from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import HotelAdditionalInfoSection from 'components/hotel_additional_info_section';
import HotelFacilitiesSection from 'components/hotel_facilities_section';
import HotelInfoSection from 'components/hotel_info_section';
import HotelRatesSection from 'components/hotel_rates_section';
import Loading from 'components/loading';
import MapSection from 'components/map_section';
import PhotoSlider from 'components/photo_slider';
import SearchSection from 'components/search_section';

import { BookingDataContext } from 'containers/data_context';

import styles from './hotel_page.module.css';

export default function HotelPage() {
  const { property } = useContext(BookingDataContext);
  const { data: propertyData, isLoading } = property;
  const isPropertyPresent = propertyData && !isLoading;

  if (!isPropertyPresent) {
    return <Loading />;
  }

  return (
    <div>
      <Header property={propertyData} />
      <div className={styles.sliderContainer}>
        <PhotoSlider photos={propertyData.photos} />
      </div>
      <div className={styles.floatingSearchContainer}>
        <SearchSection property={propertyData} />
        <HotelInfoSection property={propertyData} />
        <HotelRatesSection property={propertyData} loading={isLoading} />
        <HotelFacilitiesSection property={propertyData} />
        <HotelAdditionalInfoSection property={propertyData} />
      </div>
      <MapSection property={propertyData} />
      <Footer property={propertyData} />
    </div>
  );
}
