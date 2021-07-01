import React, { useContext, useEffect } from "react";
import { Col } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";

import BookinSummary from "components/booking_summary";
import Footer from "components/footer";
import Header from "components/header";
import SectionWrapper from "components/layout/section_wrapper";
import Loading from "components/loading";
import Navigation from "components/navigation";
import PaymentForm from "components/payment_form";

import {
  AppActionsContext,
  BookingActionsContext,
  BookingDataContext,
} from "containers/data_context";

import routes from "routing/routes";

import buildPath from "utils/build_path";

export default function PaymentPage() {
  const { property, params, roomsInfo, channelId } = useContext(BookingDataContext);
  const bookingActions = useContext(BookingActionsContext);
  const { init } = useContext(AppActionsContext);
  const history = useHistory();
  const { data: propertyData, isLoading: isPropertyLoading } = property;
  const { data: roomsData, isLoading: isRoomsLoading } = roomsInfo;
  const isPropertyPresent = propertyData && !isPropertyLoading;
  const isRoomsPresent = roomsData && !isRoomsLoading;
  const { ratesOccupancyPerRoom, checkinDate, checkoutDate } = params;
  const isReqiredDataPresent = ratesOccupancyPerRoom && checkinDate && checkoutDate;

  const onSuccess = (bookingParams) => {
    const { uniqueId: bookingId } = bookingParams;
    const routeParams = { channelId, bookingId };
    const { search } = history.location;
    const confirmationPagePath = buildPath(search, routes.confirmationPage, routeParams);

    history.push(confirmationPagePath);
  };

  useEffect(
    function initApp() {
      const savedBookingParams = bookingActions.getDataFromStorage();

      init(bookingActions, savedBookingParams);
    },
    [bookingActions, init],
  );

  if (!isPropertyPresent || !isRoomsPresent) {
    return <Loading />;
  }

  if (!isReqiredDataPresent) {
    const redirectPath = buildPath("", routes.hotelPage, { channelId });

    return <Redirect to={redirectPath} />;
  }

  return (
    <div>
      <Header property={propertyData} />
      <SectionWrapper theme="dark">
        <Col xs="12" lg="8">
          <>
            <Navigation />
            <PaymentForm
              property={propertyData}
              params={params}
              rooms={roomsData}
              channelId={channelId}
              onSuccess={onSuccess}
            />
          </>
        </Col>
        <Col xs="12" lg="4">
          <BookinSummary property={propertyData} rooms={roomsData} params={params} />
        </Col>
      </SectionWrapper>
      <Footer property={propertyData} />
    </div>
  );
}
