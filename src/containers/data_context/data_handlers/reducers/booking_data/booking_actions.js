import Actions from 'actions';
import { matchPath } from 'react-router-dom';
import convertClosedDatesToClientFormat from './convert_closed_dates_to_client_format';

export const SET_CHANNEL_ID = 'SET_CHANNEL_ID';
export const SET_PROPERTY_LOADING = 'SET_PROPERTY_LOADING';
export const SET_PROPERTY_DATA = 'SET_PROPERTY_DATA';
export const SET_ROOMS_LOADING = 'SET_ROOMS_LOADING';
export const SET_ROOMS_DATA = 'SET_ROOMS_DATA';
export const SET_CLOSED_DATES_LOADING = 'SET_CLOSED_DATES_LOADING';
export const SET_CLOSED_DATES_DATA = 'SET_CLOSED_DATES_DATA';
export const SET_PARAMS = 'SET_PARAMS';

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

const getChannelId = (location) => {
  const matchedPath = matchPath(location.pathname, { path: '/:channelId'});

  if (!matchedPath) {
    return null;
  }

  return matchedPath.params.channelId;
};

const loadProperty = async (dispatch, channelId) => {
  if (!channelId) {
    return;
  }

  setPropertyLoading(dispatch);

  const data = await Actions.getPropertyInfo(channelId);

  setPropertyData(dispatch, data);
};

const loadRoomsInfo = async (dispatch, channelId, params) => {
  if (!channelId) {
    return;
  }

  setRoomsLoading(dispatch);

  const data = await Actions.getRoomsInfo(channelId, params);

  setRoomsData(dispatch, data);
};

const loadClosedDates = async (dispatch, channelId) => {
  if (!channelId) {
    return;
  }

  setClosedDatesLoading(dispatch);

  const rawData = await Actions.getClosedDates(channelId);
  const data = convertClosedDatesToClientFormat(rawData);

  setClosedDatesData(dispatch, data);
};

const setBookingParams = (dispatch, channelId, bookingParams) => {
  setParams(dispatch, bookingParams);

  loadRoomsInfo(dispatch, channelId, bookingParams);
};

const initBookingData = async (dispatch, location, bookingParams) => {
  const channelId = getChannelId(location);

  setChannelId(dispatch, channelId);
  loadProperty(dispatch, channelId);
  loadClosedDates(dispatch, channelId);
  setBookingParams(dispatch, channelId, bookingParams);
};

export const actions = {
  loadProperty,
  loadRoomsInfo,
  loadClosedDates,
  setBookingParams,
  initBookingData,
};
