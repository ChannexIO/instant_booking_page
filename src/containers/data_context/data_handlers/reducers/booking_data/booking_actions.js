import ApiActions from "api_actions";

import getChannelId from "utils/get_channel_id";

export const SET_CHANNEL_ID = "SET_CHANNEL_ID";
export const SET_PROPERTY_LOADING = "SET_PROPERTY_LOADING";
export const SET_PROPERTY_DATA = "SET_PROPERTY_DATA";
export const SET_ROOMS_LOADING = "SET_ROOMS_LOADING";
export const SET_ROOMS_DATA = "SET_ROOMS_DATA";
export const SET_CLOSED_DATES_LOADING = "SET_CLOSED_DATES_LOADING";
export const SET_CLOSED_DATES_DATA = "SET_CLOSED_DATES_DATA";
export const SET_PARAMS = "SET_PARAMS";
export const SET_ROOMS_REQUEST_PARAMS = "SET_ROOMS_REQUEST_PARAMS";
export const RESET_PARAMS = "RESET_PARAMS";

const setChannelId = (dispatch, payload) => {
  return dispatch({ type: SET_CHANNEL_ID, payload });
};

const setPropertyLoading = (dispatch) => {
  return dispatch({ type: SET_PROPERTY_LOADING });
};

const setPropertyData = (dispatch, payload) => {
  return dispatch({ type: SET_PROPERTY_DATA, payload });
};

const setRoomsLoading = (dispatch) => {
  return dispatch({ type: SET_ROOMS_LOADING });
};

const setRoomsData = (dispatch, payload) => {
  return dispatch({ type: SET_ROOMS_DATA, payload });
};

const setClosedDatesLoading = (dispatch) => {
  return dispatch({ type: SET_CLOSED_DATES_LOADING });
};

const setClosedDatesData = (dispatch, payload) => {
  return dispatch({ type: SET_CLOSED_DATES_DATA, payload });
};

const setParams = (dispatch, payload) => {
  return dispatch({ type: SET_PARAMS, payload });
};

const setRoomsRequestParams = (dispatch, payload) => {
  return dispatch({ type: SET_ROOMS_REQUEST_PARAMS, payload });
};

const resetParams = (dispatch) => {
  return dispatch({ type: RESET_PARAMS });
};

const loadProperty = async (dispatch, channelId) => {
  if (!channelId) {
    return;
  }

  setPropertyLoading(dispatch);
  try {
    const data = await ApiActions.getPropertyInfo(channelId);

    setPropertyData(dispatch, data);
  } catch (error) {
    setPropertyData(dispatch, null);

    if (error.status === 404) {
      // TODO move exeptions to a separate file (if there will be more than 1-2)
      throw Error("PROPERY_NOT_FOUND");
    }
  }
};

const loadRoomsInfo = async (dispatch, channelId, params) => {
  if (!channelId) {
    return;
  }

  setRoomsLoading(dispatch);

  setRoomsRequestParams(dispatch, params);

  try {
    const data = await ApiActions.getRoomsInfo(channelId, params);

    setRoomsData(dispatch, data, params);
  } catch (error) {
    setRoomsData(dispatch, null, params);
  }
};

const loadClosedDates = async (dispatch, channelId) => {
  if (!channelId) {
    return;
  }

  setClosedDatesLoading(dispatch);

  try {
    const data = await ApiActions.getClosedDates(channelId);

    setClosedDatesData(dispatch, data);
  } catch (error) {
    setClosedDatesData(dispatch, null);
  }
};

const setParamsAndLoadRoomsInfo = (dispatch, channelId, bookingParams) => {
  setParams(dispatch, bookingParams);

  return loadRoomsInfo(dispatch, channelId, bookingParams);
};

const mergeBookingParams = (channelId, bookingQueryParams, savedBookingData) => {
  if (!savedBookingData || channelId !== savedBookingData.channelId) {
    return bookingQueryParams;
  }

  const { params } = savedBookingData;

  return { ...params, ...bookingQueryParams };
};

const initBookingData = (dispatch, bookingQueryParams, savedBookingData) => {
  const channelId = getChannelId();

  if (!channelId) {
    throw Error("PROPERY_NOT_FOUND");
  }

  const bookingParams = mergeBookingParams(channelId, bookingQueryParams, savedBookingData);

  setChannelId(dispatch, channelId);

  return loadProperty(dispatch, channelId).then(() =>
    setParamsAndLoadRoomsInfo(dispatch, channelId, bookingParams),
  );
};

export const actions = {
  loadProperty,
  loadRoomsInfo,
  loadClosedDates,
  setParams,
  resetParams,
  setParamsAndLoadRoomsInfo,
  initBookingData,
};
