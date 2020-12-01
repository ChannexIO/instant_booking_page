import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import Footer from 'components/footer';
import Header from 'components/header';
import Loading from 'components/loading';
import ReturnLink from 'components/return_link';

import {
  AppActionsContext,
  BookingActionsContext,
  BookingDataContext,
  PaymentFormDataContext,
} from 'containers/data_context';

import routes from 'routing/routes';

import buildPath from 'utils/build_path';

import ThankPanel from './thank_panel';

export default function ConfirmationPage() {
  const { value } = useContext(PaymentFormDataContext);
  const { channelId, property } = useContext(BookingDataContext);
  const bookingActions = useContext(BookingActionsContext);
  const { init } = useContext(AppActionsContext);
  const { bookingId } = useParams();
  const { t } = useTranslation();
  const history = useHistory();
  const { data: propertyData, isLoading } = property;
  const isPropertyPresent = propertyData && !isLoading;
  const email = value?.customer?.mail;
  const hotelPageLocation = buildPath(history, routes.hotelPage, { channelId });

  useEffect(function initApp() {
    const savedBookingParams = bookingActions.getDataFromStorage();

    init(channelId, bookingActions, savedBookingParams);
  }, [bookingActions, channelId, init]);

  if (!isPropertyPresent) {
    return <Loading />;
  }

  return (
    <div>
      <Header property={propertyData} />
      <ReturnLink to={hotelPageLocation}>
        {t('payment_page:back_to_hotel_page')}
      </ReturnLink>
      <ThankPanel
        bookingId={bookingId}
        email={email}
      />
      <Footer property={propertyData} />
    </div>
  );
}
