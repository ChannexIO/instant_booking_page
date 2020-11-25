import React, { createContext, useEffect } from 'react';

import useBooking from './data_handlers/booking';
import usePaymentForm from './data_handlers/payment_form';
import getBookingParamsFromUrl from './utils/get_booking_params_from_url';

const BookingDataContext = createContext();
const BookingActionsContext = createContext();

const PaymentFormDataContext = createContext();
const PaymentFormActionsContext = createContext();

const DataContextProvider = ({ children }) => {
  const { bookingData, bookingActions } = useBooking();
  const { paymentFormData, paymentFormActions } = usePaymentForm();

  useEffect(function initAppData() {
    if (!bookingData.channelId) {
      const bookingQueryParams = getBookingParamsFromUrl();
      const savedBookingData = bookingActions.getDataFromStorage();

      bookingActions.initBookingData(bookingQueryParams, savedBookingData);
    }
  }, [bookingData.channelId, bookingActions]);

  return (
    <BookingActionsContext.Provider value={bookingActions}>
      <BookingDataContext.Provider value={bookingData}>
        <PaymentFormActionsContext.Provider value={paymentFormActions}>
          <PaymentFormDataContext.Provider value={paymentFormData}>
            {children}
          </PaymentFormDataContext.Provider>
        </PaymentFormActionsContext.Provider>
      </BookingDataContext.Provider>
    </BookingActionsContext.Provider>
  );
};

export {
  DataContextProvider,
  BookingDataContext,
  BookingActionsContext,
  PaymentFormDataContext,
  PaymentFormActionsContext,
};
