import React, { useContext, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Footer from "components/footer";
import Header from "components/header";
import SectionWrapper from "components/layout/section_wrapper";
import Loading from "components/loading";
import Navigation from "components/navigation";

import {
  AppActionsContext,
  BookingActionsContext,
  BookingDataContext,
  PaymentFormDataContext,
} from "containers/data_context";

import NewBookinLink from "./new_booking_link";
import ThankPanel from "./thank_panel";

export default function ConfirmationPage() {
  const { value } = useContext(PaymentFormDataContext);
  const { channelId, property } = useContext(BookingDataContext);
  const bookingActions = useContext(BookingActionsContext);
  const { init } = useContext(AppActionsContext);
  const { bookingId } = useParams();
  const { data: propertyData, isLoading } = property;
  const isPropertyPresent = propertyData && !isLoading;
  const email = value?.customer?.mail;

  useEffect(
    function initApp() {
      const savedBookingParams = bookingActions.getDataFromStorage();

      init(channelId, bookingActions, savedBookingParams);
    },
    [bookingActions, channelId, init],
  );

  if (!isPropertyPresent) {
    return <Loading />;
  }

  return (
    <div>
      <Header property={propertyData} />
      <SectionWrapper theme="light">
        <Col xs="12">
          <Navigation />
        </Col>
        <Col xs="12">
          <ThankPanel bookingId={bookingId} email={email} />
          <NewBookinLink channelId={channelId} />
        </Col>
      </SectionWrapper>
      <Footer property={propertyData} />
    </div>
  );
}
