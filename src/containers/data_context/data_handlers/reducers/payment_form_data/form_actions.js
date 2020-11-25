import ApiActions from 'api_actions';

export const SET_ERRORS = 'SET_ERRORS';
export const SET_FORM_SUBMITTING = 'SET_FORM_SUBMITTING';
export const SET_FORM_SUBMIT_SUCCESS = 'SET_FORM_SUBMIT_SUCCESS';
export const SET_FORM_SUBMIT_ERROR = 'SET_FORM_SUBMIT_ERROR';
export const SET_SUBMIT_HANDLER = 'SET_SUBMIT_HANDLER';

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

  setFormSubmitSuccess(dispatch);

  try {
    const response = await ApiActions.createBooking(channelId, formParams);

    setFormSubmitSuccess(dispatch);

    return response;
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
