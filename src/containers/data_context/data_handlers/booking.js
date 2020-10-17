import { useReducer, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { INITIAL_STATE, reducer, actions } from './reducers/booking_data';

export default () => {
  const [bookingData, dispatch] = useReducer(reducer, INITIAL_STATE);
  const location = useLocation();

  const setBookingParams = (newParams) => {
    return actions.setBookingParams(dispatch, bookingData.channelId, newParams);
  };

  const loadProperty = () => {
    return actions.loadProperty(dispatch, bookingData.channelId);
  };

  const loadRoomsInfo = () => {
    return actions.loadRoomsInfo(dispatch, bookingData.channelId, bookingData.params);
  };

  const loadClosedDates = () => {
    return actions.loadClosedDates(dispatch, bookingData.channelId);
  };

  const initBookingData = (bookingParams) => {
    return actions.initBookingData(dispatch, location, bookingParams);
  };

  const bookingActions = {
    initBookingData,
    setBookingParams,
    loadProperty,
    loadRoomsInfo,
    loadClosedDates,
  };

  return { bookingData, bookingActions };
};