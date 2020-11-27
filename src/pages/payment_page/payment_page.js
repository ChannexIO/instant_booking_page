import React, { useContext } from 'react';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import BookinSummary from 'components/booking_summary';
import Footer from 'components/footer';
import Header from 'components/header';
import SectionWrapper from 'components/layout/section_wrapper';
import Loading from 'components/loading';
import PaymentForm from 'components/payment_form';

import { BookingDataContext } from 'containers/data_context';

import routes from 'routing/routes';

import buildPath from 'utils/build_path';

export default function PaymentPage() {
  const { property, params, roomsInfo, channelId } = useContext(BookingDataContext);
  const history = useHistory();
  const { data: propertyData, isLoading: isPropertyLoading } = property;
  const { data: roomsData, isLoading: isRoomsLoading } = roomsInfo;
  const isPropertyPresent = propertyData && !isPropertyLoading;
  const isRoomsPresent = roomsData && !isRoomsLoading;

  const onSuccess = (bookingParams) => {
    const { uniqueId: bookingId } = bookingParams;
    const routeParams = { channelId, bookingId };
    const confirmationPagePath = buildPath(history, routes.confirmationPage, routeParams);

    history.push(confirmationPagePath);
  };

  if (!isPropertyPresent || !isRoomsPresent) {
    return <Loading />;
  }

  return (
    <div>
      <Header property={propertyData} />
      <SectionWrapper theme="dark" >
        <Col xs="12" lg="8" >
          <PaymentForm
            property={propertyData}
            params={params}
            rooms={roomsData}
            channelId={channelId}
            onSuccess={onSuccess}
          />
        </Col>
        <Col xs="12" lg="4" >
          <BookinSummary
            property={propertyData}
            rooms={roomsData}
            params={params}
          />
        </Col>
      </SectionWrapper>
      <Footer property={propertyData} />
    </div>
  );
}
