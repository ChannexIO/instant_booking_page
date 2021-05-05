import ApiActions from "api_actions";

export const SET_SUBMITTED_VALUE = "SET_SUBMITTED_VALUE";
export const SET_ERRORS = "SET_ERRORS";
export const SET_FORM_SUBMITTING = "SET_FORM_SUBMITTING";
export const SET_FORM_SUBMIT_SUCCESS = "SET_FORM_SUBMIT_SUCCESS";
export const SET_FORM_SUBMIT_ERROR = "SET_FORM_SUBMIT_ERROR";
export const SET_SUBMIT_HANDLER = "SET_SUBMIT_HANDLER";

const setSubmittedValue = (dispatch, payload) => {
  return dispatch({ type: SET_SUBMITTED_VALUE, payload });
};

const setErrors = (dispatch, payload) => {
  return dispatch({ type: SET_ERRORS, payload });
};

const setFormSubmitting = (dispatch) => {
  return dispatch({ type: SET_FORM_SUBMITTING });
};

const setFormSubmitSuccess = (dispatch) => {
  return dispatch({ type: SET_FORM_SUBMIT_SUCCESS });
};

const setSubmitHandler = (dispatch, payload) => {
  return dispatch({ type: SET_SUBMIT_HANDLER, payload });
};

const setFormSubmitError = (dispatch, payload) => {
  return dispatch({ dispatch, payload });
};

const createBooking = async (dispatch, channelId, formParams) => {
  setFormSubmitting(dispatch);
  setSubmittedValue(dispatch, formParams);

  try {
    const newBookingInfo = await ApiActions.createBooking(channelId, formParams);

    setFormSubmitSuccess(dispatch);

    return newBookingInfo;
  } catch (error) {
    setFormSubmitError(dispatch, error);

    throw error;
  }
};

export const actions = {
  setErrors,
  setSubmitHandler,
  createBooking,
};
