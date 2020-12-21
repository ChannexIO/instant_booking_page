import {
  RESET_PARAMS,
  SET_CHANNEL_ID,
  SET_CLOSED_DATES_DATA,
  SET_CLOSED_DATES_LOADING,
  SET_PARAMS,
  SET_PROPERTY_DATA,
  SET_PROPERTY_LOADING,
  SET_ROOMS_DATA,
  SET_ROOMS_LOADING,
  SET_ROOMS_REQUEST_PARAMS,
} from './booking_actions';

const EMPTY_ENTITY = {
  data: null,
  isLoading: false,
};

export const INITIAL_STATE = {
  channelId: null,
  property: EMPTY_ENTITY,
  roomsInfo: EMPTY_ENTITY,
  closedDates: EMPTY_ENTITY,
  params: {
    children: 0,
    adults: 1,
  },
  roomRequestParams: {},
};

const actionHandlers = {
  [SET_CHANNEL_ID]: (state, action) => {
    return { ...state, channelId: action.payload };
  },
  [SET_PROPERTY_LOADING]: (state) => {
    const property = { ...state.property, isLoading: true };

    return { ...state, property };
  },
  [SET_PROPERTY_DATA]: (state, action) => {
    const property = { data: action.payload, isLoading: false };

    return { ...state, property };
  },
  [SET_ROOMS_LOADING]: (state) => {
    const roomsInfo = { ...state.roomsInfo, isLoading: true };

    return { ...state, roomsInfo };
  },
  [SET_ROOMS_DATA]: (state, action) => {
    const roomsInfo = { data: action.payload, isLoading: false };

    return { ...state, roomsInfo };
  },
  [SET_CLOSED_DATES_LOADING]: (state) => {
    const closedDates = { ...state.closedDates, isLoading: true };

    return { ...state, closedDates };
  },
  [SET_CLOSED_DATES_DATA]: (state, action) => {
    const closedDates = { data: action.payload, isLoading: false };

    return { ...state, closedDates };
  },
  [SET_PARAMS]: (state, action) => {
    return { ...state, params: action.payload };
  },
  [RESET_PARAMS]: (state) => {
    return { ...state, params: INITIAL_STATE.params };
  },
  [SET_ROOMS_REQUEST_PARAMS]: (state, action) => {
    return { ...state, roomRequestParams: action.payload };
  }
};

export const reducer = (state, action) => {
  const handler = actionHandlers[action.type];

  return handler ? handler(state, action) : state;
};
