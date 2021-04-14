import ApiActions from "api_actions";

export const SET_PROPERTIES_LOADING = "SET_PROPERTIES_LOADING";
export const SET_PROPERTIES_LIST = "SET_PROPERTIES_LIST";

const setPropertiesListLoading = (dispatch) => {
  return dispatch({ type: SET_PROPERTIES_LOADING });
};

const setPropertiesList = (dispatch, payload) => {
  return dispatch({ type: SET_PROPERTIES_LIST, payload });
};

const loadPropertiesList = async (dispatch, params, filter) => {
  setPropertiesListLoading(dispatch);

  const data = await ApiActions.getPropertiesList(params, filter);

  setPropertiesList(dispatch, data);
};
export const actions = {
  loadPropertiesList,
};
