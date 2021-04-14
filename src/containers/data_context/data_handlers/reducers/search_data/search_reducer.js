import { SET_PROPERTIES_LIST, SET_PROPERTIES_LOADING } from "./search_actions";

const EMPTY_ENTITY = {
  data: null,
  isLoading: false,
};

export const INITIAL_STATE = {
  properties: EMPTY_ENTITY,
};

const actionHandlers = {
  [SET_PROPERTIES_LOADING]: (state) => {
    const properties = { ...state.properties, isLoading: true };

    return { ...state, properties };
  },
  [SET_PROPERTIES_LIST]: (state, action) => {
    const properties = { data: action.payload, isLoading: false };

    return { ...state, properties };
  },
};

export const reducer = (state, action) => {
  const handler = actionHandlers[action.type];

  return handler ? handler(state, action) : state;
};
