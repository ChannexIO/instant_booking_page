import React, { useEffect } from 'react';

import useBooking from './data_handlers/booking';

import getSearchParamsFromUrl from './utils/get_search_params_from_url';

const DataContext = React.createContext();
const ActionsContext = React.createContext();

const DataContextProvider = (props) => {
  const { bookingData, bookingActions } = useBooking();

  useEffect(function initAppData() {
    const queryParams = getSearchParamsFromUrl();

    bookingActions.initBookingData(queryParams);
  }, []);

  return (
    <ActionsContext.Provider value={bookingActions}>
      <DataContext.Provider value={bookingData}>
        {props.children}
      </DataContext.Provider>
    </ActionsContext.Provider>
  );
};

export { DataContextProvider, DataContext, ActionsContext };
