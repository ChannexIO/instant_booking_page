import React, { createContext } from "react";

import useApp from "./data_handlers/app";
import useBooking from "./data_handlers/booking";
import usePaymentForm from "./data_handlers/payment_form";
import useSearch from "./data_handlers/search";

const AppActionsContext = createContext();

const BookingDataContext = createContext();
const BookingActionsContext = createContext();

const PaymentFormDataContext = createContext();
const PaymentFormActionsContext = createContext();

const SearchDataContext = createContext();
const SearchActionsContext = createContext();

const DataContextProvider = ({ children }) => {
  const { bookingData, bookingActions } = useBooking();
  const { paymentFormData, paymentFormActions } = usePaymentForm();
  const { appActions } = useApp();
  const { searchData, searchActions } = useSearch();

  return (
    <AppActionsContext.Provider value={appActions}>
      <BookingActionsContext.Provider value={bookingActions}>
        <BookingDataContext.Provider value={bookingData}>
          <PaymentFormActionsContext.Provider value={paymentFormActions}>
            <PaymentFormDataContext.Provider value={paymentFormData}>
              <SearchActionsContext.Provider value={searchActions}>
                <SearchDataContext.Provider value={searchData}>
                  {children}
                </SearchDataContext.Provider>
              </SearchActionsContext.Provider>
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
  SearchDataContext,
  SearchActionsContext,
};
