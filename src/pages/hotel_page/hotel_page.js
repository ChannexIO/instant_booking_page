import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';

import Header from 'components/header';
import PhotoSlider from 'components/photo_slider';
import SearchSection from 'components/search_section';
import HotelInfoSection from 'components/hotel_info_section';
import HotelFacilitiesSection from 'components/hotel_facilities_section';
import HotelRatesSection from 'components/hotel_rates_section';
import MapSection from 'components/map_section';
import HotelAdditionalInfoSection from 'components/hotel_additional_info_section';
import Footer from 'components/footer';
import SectionWrapper from 'components/section_wrapper';
import Loading from 'components/loading';

import { DataContext } from 'containers/data_context';

import styles from './hotel_page.module.css';

export default function HotelPage() {
  const { property } = useContext(DataContext);
  const { data: propertyData, isLoading } = property;
  const isPropertyPresent = propertyData && !isLoading;

  if (!isPropertyPresent) {
    return <Loading />;
  }

  return (
    <div>
      <div className={styles.firstScreen}>
        <Container>
          <Header property={propertyData} />
        </Container>
        <PhotoSlider photos={propertyData.photos} />
        <Container>
          <SearchSection property={propertyData} />
        </Container>
      </div>
      <SectionWrapper theme="light">
        <HotelInfoSection property={propertyData} />
      </SectionWrapper>
      <SectionWrapper theme="dark">
        <HotelRatesSection property={propertyData} loading={isLoading} />
      </SectionWrapper>
      <SectionWrapper theme="light">
        <HotelFacilitiesSection property={propertyData} />
      </SectionWrapper>
      <MapSection property={propertyData} />
      <SectionWrapper theme="dark">
        <HotelAdditionalInfoSection property={propertyData} />
      </SectionWrapper>
      <Footer />
    </div>
  );
}