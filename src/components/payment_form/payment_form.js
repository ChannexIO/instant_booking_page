import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { PaymentFormActionsContext } from "containers/data_context";

import buildBooking from "./utils/builld_booking";
import isTurnstileError from "./utils/is_turnstile_error";
import BillingAddress from "./billing_address";
import CardCaptureForm from "./card_capture_form";
import CustomerInfo from "./customer_info";
import ErrorModal from "./error_modal";
import GuestInfo from "./guest_info";
import SubmitSection from "./submit_section";
import TurnstileWidget, { IS_TURNSTILE_ENABLED } from "./turnstile_widget";

const getSchema = () =>
  yup.object({
    customer: CustomerInfo.getSchema(),
    guest: yup.array().of(GuestInfo.getSchema()),
    billingAddress: BillingAddress.getSchema(),
  });

const EMPTY_FORM = {};

export default function PaymentForm({ channelId, property, rooms, params, onSuccess }) {
  const guestRooms = Object.keys(params.ratesOccupancyPerRoom).reduce((roomsList, roomTypeCode) => {
    const selectedRates = params.ratesOccupancyPerRoom[roomTypeCode];
    const roomProps = rooms.find((room) => roomTypeCode === room.id);

    const bookedPerRoomId = Object.keys(selectedRates).reduce((acc, ratePlanCode) => {
      const ratePlan = roomProps.ratePlans.find((rate) => ratePlanCode === rate.id);
      const room = new Array(selectedRates[ratePlanCode]).fill({
        title: roomProps.title,
        maxGuests: ratePlan.occupancy.adults + ratePlan.occupancy.children,
      });
      return [...acc, ...room];
    }, roomsList);

    return bookedPerRoomId;
  }, []);

  const { t } = useTranslation();
  const {
    setSubmitHandler,
    createBooking,
    setFormSubmitComplete,
    setTurnstileToken,
    setTurnstileUnavailable,
  } = useContext(PaymentFormActionsContext);
  const [isErrorModalVisible, setErrorModalVisibility] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const { requestCreditCard = true, requestBillingInfo = false } = property;
  const paymentFormMethods = useForm({
    mode: "onChange",
    resolver: yupResolver(getSchema()),
    context: {
      billingAddressIsRequired: requestBillingInfo,
    },
  });
  const captureFormRef = useRef();
  const turnstileRef = useRef();
  const paymentFormRef = useRef();
  const { handleSubmit } = paymentFormMethods;

  const handleSubmitError = useCallback(() => {
    setFormSubmitComplete();
  }, [setFormSubmitComplete]);

  const toggleErrorModal = useCallback(() => {
    handleSubmitError();
    setErrorModalVisibility(!isErrorModalVisible);
  }, [isErrorModalVisible, handleSubmitError]);

  const showErrorModal = useCallback(
    (text = null) => {
      setErrorText(text);
      toggleErrorModal();
    },
    [toggleErrorModal],
  );

  const handleCreateBooking = useCallback(
    async (formParams, cardParams) => {
      if ((requestCreditCard && !cardParams) || !formParams) {
        showErrorModal();
        return;
      }

      const turnstileErrorText = t(
        "payment_page:turnstile:verification_error",
        "We could not verify that you are not a robot. Please complete the security check again and resubmit the booking.",
      );
      // Not required when the widget can't run here (e.g. a custom domain): the API decides.
      const isTurnstileRequired =
        IS_TURNSTILE_ENABLED && Boolean(turnstileRef.current?.isRequired());
      const turnstileToken = isTurnstileRequired ? turnstileRef.current.getToken() : null;

      if (isTurnstileRequired && !turnstileToken) {
        showErrorModal(turnstileErrorText);

        if (requestCreditCard) {
          captureFormRef.current.resetSession();
        }

        setFormData(EMPTY_FORM);
        return;
      }

      const booking = buildBooking(property, rooms, params, cardParams, formParams);

      try {
        const bookingParams = await createBooking(channelId, booking, turnstileToken);

        onSuccess(bookingParams);
      } catch (error) {
        const isTurnstileFailed = await isTurnstileError(error);

        showErrorModal(isTurnstileFailed ? turnstileErrorText : null);
        captureFormRef.current.resetSession();
      } finally {
        // The token is single-use: the API consumes it on every push_booking call.
        if (turnstileRef.current) {
          turnstileRef.current.reset();
        }
      }

      setFormData(EMPTY_FORM);
    },
    [
      t,
      channelId,
      createBooking,
      requestCreditCard,
      captureFormRef,
      turnstileRef,
      property,
      rooms,
      params,
      showErrorModal,
      onSuccess,
    ],
  );

  const handlePaymentFormSubmitted = useCallback(
    (newFormData) => {
      const submitHandler = requestCreditCard ? captureFormRef.current.submit : handleCreateBooking;

      setFormData(newFormData);
      submitHandler(newFormData, null);
    },
    [captureFormRef, requestCreditCard, handleCreateBooking],
  );

  const handleCaptureFormValidated = useCallback(
    async ({ valid }) => {
      if (!valid) {
        // trigger submit only for validation (explicit call for validation wont scroll to field with error)
        handleSubmit(handleSubmitError, handleSubmitError)();
        return;
      }

      handleSubmit(handlePaymentFormSubmitted, handleSubmitError)();
    },
    [handleSubmit, handlePaymentFormSubmitted, handleSubmitError],
  );

  const handleCaptureFormSubmitted = useCallback(
    (submitEvent) => {
      const { card } = submitEvent;

      handleCreateBooking(formData, card);
    },
    [handleCreateBooking, formData],
  );

  useEffect(
    function initSubmitHandler() {
      const paymentFormSubmit = handleSubmit(handlePaymentFormSubmitted, handleSubmitError);
      const captureFormSubmit = captureFormRef.current.validate;
      const submitHandler = requestCreditCard ? captureFormSubmit : paymentFormSubmit;

      setSubmitHandler(submitHandler);
    },
    [
      requestCreditCard,
      setSubmitHandler,
      captureFormRef,
      handleSubmitError,
      handlePaymentFormSubmitted,
      handleSubmit,
    ],
  );

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...paymentFormMethods}>
        <form ref={paymentFormRef} onSubmit={handleSubmit(handlePaymentFormSubmitted)}>
          <CustomerInfo.Form />
          {guestRooms.map((room, index) => (
            <GuestInfo.Form key={index} maxGuests={room.maxGuests} room={room} index={index} />
          ))}
          <BillingAddress.Form />
        </form>
        <CardCaptureForm
          visible={requestCreditCard}
          ref={captureFormRef}
          onSubmit={handleCaptureFormSubmitted}
          onValidate={handleCaptureFormValidated}
        />
        {IS_TURNSTILE_ENABLED && (
          <TurnstileWidget
            ref={turnstileRef}
            onTokenChange={setTurnstileToken}
            onUnavailable={setTurnstileUnavailable}
          />
        )}
        <SubmitSection />
      </FormProvider>
      <ErrorModal visible={isErrorModalVisible} text={errorText} onClose={toggleErrorModal} />
    </>
  );
}
