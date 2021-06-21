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
    return paymentFormData.submitHandler();
  }, [paymentFormData]);

  const paymentFormActions = useMemo(
    () => ({
      setSubmitHandler,
      createBooking,
      startSubmit,
    }),
    [setSubmitHandler, createBooking, startSubmit],
  );

  return useMemo(
    () => ({ paymentFormData, paymentFormActions }),
    [paymentFormData, paymentFormActions],
  );
};
