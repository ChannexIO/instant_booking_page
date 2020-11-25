import React, { useContext } from 'react';

import BookinSummary from 'components/booking_summary';
import Footer from 'components/footer';
import Header from 'components/header';
import SectionWrapper from 'components/layout/section_wrapper';
import Loading from 'components/loading';
import PaymentForm from 'components/payment_form';

import { BookingDataContext } from 'containers/data_context';

export default function PaymentPage() {
  const { property, params, roomsInfo, channelId } = useContext(BookingDataContext);
  const { data: propertyData, isLoading: isPropertyLoading } = property;
  const { data: roomsData, isLoading: isRoomsLoading } = roomsInfo;
  const isPropertyPresent = propertyData && !isPropertyLoading;
  const isRoomsPresent = roomsData && !isRoomsLoading;

  if (!isPropertyPresent || !isRoomsPresent) {
    return <Loading />;
  }

  return (
    <div>
      <Header property={propertyData} />
      <SectionWrapper
        theme="dark"
        additionalInfo={
          <BookinSummary
            property={propertyData}
            rooms={roomsData}
            params={params}
          />
        }
      >
        <PaymentForm
          property={propertyData}
          params={params}
          rooms={roomsData}
          channelId={channelId}
        />
      </SectionWrapper>
      <Footer property={propertyData} />
    </div>
  );
}
