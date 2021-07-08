import {
  SET_ERRORS,
  SET_FORM_SUBMIT_COMPLETE,
  SET_FORM_SUBMIT_ERROR,
  SET_FORM_SUBMITTING,
  SET_SUBMIT_HANDLER,
  SET_SUBMITTED_VALUE,
} from "./form_actions";

const DEFAULT_ERRORS = {};

export const INITIAL_STATE = {
  value: {},
  errors: DEFAULT_ERRORS,
  isSubmitting: false,
  submitHandler: () => {},
};

const actionHandlers = {
  [SET_SUBMITTED_VALUE]: (state, action) => {
    return { ...state, value: action.payload };
  },
  [SET_ERRORS]: (state, action) => {
    return { ...state, errors: action.payload };
  },
  [SET_FORM_SUBMITTING]: (state) => {
    return { ...state, isSubmitting: true };
  },
  [SET_FORM_SUBMIT_COMPLETE]: (state) => {
    return { ...state, errors: DEFAULT_ERRORS, isSubmitting: false };
  },
  [SET_FORM_SUBMIT_ERROR]: (state, action) => {
    return { ...state, errors: action.payload, isSubmitting: false };
  },
  [SET_SUBMIT_HANDLER]: (state, action) => {
    return { ...state, submitHandler: action.payload };
  },
};

export const reducer = (state, action) => {
  const handler = actionHandlers[action.type];

  return handler ? handler(state, action) : state;
};
