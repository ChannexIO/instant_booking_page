import React, { useContext, useEffect } from "react";

import Footer from "components/footer";
import Header from "components/header";
import HotelAdditionalInfoSection from "components/hotel_additional_info_section";
import HotelFacilitiesSection from "components/hotel_facilities_section";
import HotelInfoSection from "components/hotel_info_section";
import HotelRatesSection from "components/hotel_rates_section";
import Loading from "components/loading";
import MapSection from "components/map_section";
import PhotoGallery from "components/photo_gallery";
import SearchSection from "components/search_section";

import {
  AppActionsContext,
  BookingActionsContext,
  BookingDataContext,
} from "containers/data_context";

import styles from "./hotel_page.module.css";

export default function HotelPage() {
  const { property, channelId, params } = useContext(BookingDataContext);
  const bookingActions = useContext(BookingActionsContext);
  const { init } = useContext(AppActionsContext);
  const { data: propertyData, isLoading } = property;
  const isPropertyPresent = propertyData && !isLoading;
  const { currency, checkinDate, checkoutDate, adults, childrenAge } = params;

  useEffect(
    function initApp() {
      init(bookingActions);
    },
    [bookingActions, init],
  );

  useEffect(
    function loadClosedDates() {
      bookingActions.loadClosedDates(channelId);
    },
    [channelId, bookingActions],
  );

  useEffect(
    function loadBestOffer() {
      if (!currency && !channelId) {
        return;
      }

      const requestParams = {
        currency,
        checkinDate,
        checkoutDate,
        adults,
        childrenAge
      };

      bookingActions.loadBestOffer(channelId, requestParams);
    },
    [bookingActions, channelId, currency, checkinDate, checkoutDate, adults, childrenAge],
  );

  if (!isPropertyPresent) {
    return <Loading />;
  }

  const isPhotosPresent = Boolean(propertyData.photos.length);

  return (
    <div>
      <Header property={propertyData} />
      {isPhotosPresent && <PhotoGallery photos={propertyData.photos} />}

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
