import castToType from "utils/cast_to_type";

export const INITIAL_STATE = {
  featureFlags: {
    searchPageIsActive: castToType(process.env.REACT_APP_SEARCH_PAGE_IS_ACTIVE, "boolean"),
  },
};

const actionHandlers = {};

export const reducer = (state, action) => {
  const handler = actionHandlers[action.type];

  return handler ? handler(state, action) : state;
};
