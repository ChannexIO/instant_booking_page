import React, { useEffect } from 'react';

import useBooking from './data_handlers/booking';
import getBookingParamsFromUrl from './utils/get_booking_params_from_url';

const BookingDataContext = React.createContext();
const BookingActionsContext = React.createContext();

const DataContextProvider = ({ children }) => {
  const { bookingData, bookingActions } = useBooking();

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
        {children}
      </BookingDataContext.Provider>
    </BookingActionsContext.Provider>
  );
};

export { DataContextProvider, BookingDataContext, BookingActionsContext };
