import { useCallback, useMemo, useReducer } from "react";

import { actions, INITIAL_STATE, reducer } from "./reducers/booking_data";
import {
  clearSavedState,
  getSavedState,
  setSavedState,
} from "./reducers/booking_data/utils/manage_saved_state";

export default () => {
  const [bookingData, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setParams = useCallback((newParams) => {
    return actions.setParams(dispatch, newParams);
  }, []);

  const resetParams = useCallback(() => {
    return actions.resetParams(dispatch);
  }, []);

  const setParamsAndLoadRoomsInfo = useCallback((channelId, newParams) => {
    return actions.setParamsAndLoadRoomsInfo(dispatch, channelId, newParams);
  }, []);

  const loadProperty = useCallback((channelId) => {
    return actions.loadProperty(dispatch, channelId);
  }, []);

  const loadRoomsInfo = useCallback((channelId, params) => {
    return actions.loadRoomsInfo(dispatch, channelId, params);
  }, []);

  const loadClosedDates = useCallback((channelId) => {
    return actions.loadClosedDates(dispatch, channelId);
  }, []);

  const initBookingData = useCallback((bookingQueryParams, savedBookingData) => {
    return actions.initBookingData(dispatch, bookingQueryParams, savedBookingData);
  }, []);

  const saveDataToStorage = useCallback((bookingDataToSave) => {
    setSavedState(bookingDataToSave);
  }, []);

  const getDataFromStorage = useCallback(() => {
    return getSavedState();
  }, []);

  const clearDataFromStorage = useCallback(() => {
    clearSavedState();
  }, []);

  const bookingActions = useMemo(
    () => ({
      initBookingData,
      setParams,
      resetParams,
      setParamsAndLoadRoomsInfo,

      loadProperty,
      loadRoomsInfo,
      loadClosedDates,

      saveDataToStorage,
      getDataFromStorage,
      clearDataFromStorage,
    }),
    [
      initBookingData,
      setParams,
      resetParams,
      setParamsAndLoadRoomsInfo,

      loadProperty,
      loadRoomsInfo,
      loadClosedDates,

      saveDataToStorage,
      getDataFromStorage,
      clearDataFromStorage,
    ],
  );

  return useMemo(() => ({ bookingData, bookingActions }), [bookingData, bookingActions]);
};
