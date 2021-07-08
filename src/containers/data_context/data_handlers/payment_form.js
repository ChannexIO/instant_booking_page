import { useCallback, useMemo, useReducer } from "react";

import { actions, INITIAL_STATE, reducer } from "./reducers/payment_form_data";

export default () => {
  const [paymentFormData, dispatch] = useReducer(reducer, INITIAL_STATE);

  const createBooking = useCallback(
    (channelId, bookingData) => {
      return actions.createBooking(dispatch, channelId, bookingData);
    },
    [dispatch],
  );

  const setSubmitHandler = useCallback(
    (handler) => {
      return actions.setSubmitHandler(dispatch, handler);
    },
    [dispatch],
  );

  const startSubmit = useCallback(() => {
    actions.setFormSubmitting(dispatch);

    return paymentFormData.submitHandler();
  }, [dispatch, paymentFormData]);

  const setFormSubmitComplete = useCallback(() => {
    return actions.setFormSubmitComplete(dispatch);
  }, [dispatch]);

  const paymentFormActions = useMemo(
    () => ({
      setSubmitHandler,
      createBooking,
      startSubmit,
      setFormSubmitComplete,
    }),
    [setSubmitHandler, createBooking, startSubmit, setFormSubmitComplete],
  );

  return useMemo(() => ({ paymentFormData, paymentFormActions }), [
    paymentFormData,
    paymentFormActions,
  ]);
};
