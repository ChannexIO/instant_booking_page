import { 
  SET_CHANNEL_ID,
  SET_PROPERTY_LOADING,
  SET_PROPERTY_DATA,
  SET_ROOMS_LOADING,
  SET_ROOMS_DATA,
  SET_CLOSED_DATES_LOADING,
  SET_CLOSED_DATES_DATA,
  SET_PARAMS,
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
  params: {},
};

const actionHandlers = {
  [SET_CHANNEL_ID]: (state, action) => {
    console.log(action, { ...state, channelId: action.payload });
    return { ...state, channelId: action.payload };
  },
  [SET_PROPERTY_LOADING]: (state, action) => {
    const property = { ...state.property, isLoading: true };

    return { ...state, property };
  },
  [SET_PROPERTY_DATA]: (state, action) => {
    const property = { data: action.payload, isLoading: false };

    return { ...state, property };
  },
  [SET_ROOMS_LOADING]: (state, action) => {
    const roomsInfo = { ...state.roomsInfo, isLoading: true };

    return { ...state, roomsInfo };
  },
  [SET_ROOMS_DATA]: (state, action) => {
    const roomsInfo = { data: action.payload, isLoading: false };

    return { ...state, roomsInfo };
  },
  [SET_CLOSED_DATES_LOADING]: (state, action) => {
    const closedDates = { ...state.closedDates, isLoading: true };

    return { ...state, closedDates };
  },
  [SET_CLOSED_DATES_DATA]: (state, action) => {
    const closedDates = { data: action.payload, isLoading: false };

    return { ...state, closedDates };
  },
  [SET_PARAMS]: (state, action) => {
    return { ...state, params: action.payload };
  }
};

export const reducer = (state, action) => {
  const handler = actionHandlers[action.type];

  return handler ? handler(state, action) : state;
};