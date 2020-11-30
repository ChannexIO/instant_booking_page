import React, { createContext } from 'react';

import useApp from './data_handlers/app';
import useBooking from './data_handlers/booking';
import usePaymentForm from './data_handlers/payment_form';

const AppActionsContext = createContext();

const BookingDataContext = createContext();
const BookingActionsContext = createContext();

const PaymentFormDataContext = createContext();
const PaymentFormActionsContext = createContext();

const DataContextProvider = ({ children }) => {
  const { bookingData, bookingActions } = useBooking();
  const { paymentFormData, paymentFormActions } = usePaymentForm();
  const { appActions } = useApp();

  return (
    <AppActionsContext.Provider value={appActions}>
      <BookingActionsContext.Provider value={bookingActions}>
        <BookingDataContext.Provider value={bookingData}>
          <PaymentFormActionsContext.Provider value={paymentFormActions}>
            <PaymentFormDataContext.Provider value={paymentFormData}>
              {children}
            </PaymentFormDataContext.Provider>
          </PaymentFormActionsContext.Provider>
        </BookingDataContext.Provider>
      </BookingActionsContext.Provider>
    </AppActionsContext.Provider>
  );
};

export {
  DataContextProvider,
  AppActionsContext,
  BookingDataContext,
  BookingActionsContext,
  PaymentFormDataContext,
  PaymentFormActionsContext,
};
