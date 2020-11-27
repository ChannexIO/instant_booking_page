import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import Footer from 'components/footer';
import Header from 'components/header';
import Loading from 'components/loading';

import { BookingDataContext, PaymentFormDataContext } from 'containers/data_context';

import ThankPanel from './thank_panel';

export default function ConfirmationPage() {
  const { value } = useContext(PaymentFormDataContext);
  const { property } = useContext(BookingDataContext);
  const { bookingId } = useParams();
  const { data: propertyData, isLoading } = property;
  const isPropertyPresent = propertyData && !isLoading;
  const email = value?.customer?.mail;

  if (!isPropertyPresent) {
    return <Loading />;
  }

  return (
    <div>
      <Header property={propertyData} />
      <ThankPanel
        bookingId={bookingId}
        email={email}
      />
      <Footer property={propertyData} />
    </div>
  );
}
