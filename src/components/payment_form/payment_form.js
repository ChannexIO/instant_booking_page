import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { PaymentFormActionsContext } from 'containers/data_context';

import buildBooking from './utils/builld_booking';
import BillingAddress from './billing_address';
import CardCaptureForm from './card_capture_form';
import CustomerInfo from './customer_info';
import ErrorModal from './error_modal';
import GuestInfo from './guest_info';
import SubmitSection from './submit_section';

const getSchema = () => (
  yup.object({
    customer: CustomerInfo.getSchema(),
    guest: GuestInfo.getSchema(),
    billingAddress: BillingAddress.getSchema(),
  })
);

const EMPTY_CARD = {};

export default function PaymentForm({ channelId, property, rooms, params }) {
  const [cardInfo, setCardInfo] = useState(EMPTY_CARD);
  const [isErrorModalVisible, setErrorModalVisibility] = useState(false);
  const paymentFormMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver(getSchema()),
  });
  const captureFormRef = useRef();
  const paymentFormRef = useRef();

  const prevCardInfoRef = useRef(EMPTY_CARD);
  useEffect(() => {
    prevCardInfoRef.current = cardInfo;
  });
  const prevCardInfo = prevCardInfoRef.current;

  // TODO - add api errors handling
  // const { apiErrors } = useContext(PaymentFormDataContext)
  const { setSubmitHandler, createBooking } = useContext(PaymentFormActionsContext);

  const handleCaptureFormValidated = async ({ valid: isCaptureFormValid }) => {
    const isPaymentFormValid = await paymentFormMethods.trigger();

    if (isPaymentFormValid && isCaptureFormValid) {
      captureFormRef.current.submit();
    }
  };

  const toggleErrorModal = useCallback(() => {
    setErrorModalVisibility(!isErrorModalVisible);
  }, [isErrorModalVisible]);

  const handleCaptureFormSubmitted = (submitEvent) => {
    const { card } = submitEvent;

    if (!card) {
      toggleErrorModal();
      return;
    }

    setCardInfo(card);
  };

  const handlePaymentFormSubmitted = useCallback(async (formData) => {
    if (!cardInfo.cardToken) {
      return;
    }

    const booking = buildBooking(property, rooms, params, cardInfo, formData);

    try {
      const bookingIds = await createBooking(channelId, booking);

      // eslint-disable-next-line no-alert
      alert(`success: ${JSON.stringify(bookingIds)}`);
    } catch (error) {
      toggleErrorModal();
    }

    captureFormRef.current.resetSession();
  }, [cardInfo, property, rooms, params, createBooking, channelId, toggleErrorModal]);

  useEffect(function initSubmitHandler() {
    setSubmitHandler(captureFormRef.current.validate);
  }, [setSubmitHandler, captureFormRef]);

  useEffect(function triggerPaymentFormSubmit() {
    if (prevCardInfo !== cardInfo) {
      paymentFormMethods.handleSubmit(handlePaymentFormSubmitted)();
    }
  }, [cardInfo, handlePaymentFormSubmitted, paymentFormMethods, prevCardInfo]);

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...paymentFormMethods}>
        <form
          ref={paymentFormRef}
          onSubmit={paymentFormMethods.handleSubmit(handlePaymentFormSubmitted)}
        >
          <CustomerInfo.Form />
          <GuestInfo.Form />
          <BillingAddress.Form />
        </form>
        <CardCaptureForm
          ref={captureFormRef}
          onSubmit={handleCaptureFormSubmitted}
          onValidate={handleCaptureFormValidated}
        />
        <SubmitSection />
      </FormProvider>
      <ErrorModal
        visible={isErrorModalVisible}
        onClose={toggleErrorModal}
      />
    </>
  );
}
