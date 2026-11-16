import { useCallback, useMemo, useReducer } from "react";

import { actions, INITIAL_STATE, reducer } from "./reducers/payment_form_data";

export default () => {
  const [paymentFormData, dispatch] = useReducer(reducer, INITIAL_STATE);

  const createBooking = useCallback(
    (channelId, bookingData, turnstileToken) => {
      return actions.createBooking(dispatch, channelId, bookingData, turnstileToken);
    },
    [dispatch],
  );

  const setSubmitHandler = useCallback(
    (handler) => {
      return actions.setSubmitHandler(dispatch, handler);
    },
    [dispatch],
  );

  const setTurnstileToken = useCallback(
    (token) => {
      return actions.setTurnstileToken(dispatch, token);
    },
    [dispatch],
  );

  const setTurnstileUnavailable = useCallback(() => {
    return actions.setTurnstileUnavailable(dispatch);
  }, [dispatch]);

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
      setTurnstileToken,
      setTurnstileUnavailable,
    }),
    [
      setSubmitHandler,
      createBooking,
      startSubmit,
      setFormSubmitComplete,
      setTurnstileToken,
      setTurnstileUnavailable,
    ],
  );

  return useMemo(() => ({ paymentFormData, paymentFormActions }), [
    paymentFormData,
    paymentFormActions,
  ]);
};
