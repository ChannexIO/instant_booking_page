import { useReducer } from 'react';
import { useLocation } from 'react-router-dom';

import { actions, INITIAL_STATE, reducer } from './reducers/booking_data';

export default () => {
  const [bookingData, dispatch] = useReducer(reducer, INITIAL_STATE);
  const location = useLocation();

  const setParams = (newParams) => {
    return actions.setParams(dispatch, bookingData.channelId, newParams);
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
    setParams,
    loadProperty,
    loadRoomsInfo,
    loadClosedDates,
  };

  return { bookingData, bookingActions };
};
