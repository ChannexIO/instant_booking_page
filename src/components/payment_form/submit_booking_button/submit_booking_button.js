import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/button";

import { PaymentFormActionsContext, PaymentFormDataContext } from "containers/data_context";

import PolicyCheckbox from "./policy_checkbox";

export default function SubmitBookingButton() {
  const { t } = useTranslation();
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const { startSubmit } = useContext(PaymentFormActionsContext);
  const { isSubmitting } = useContext(PaymentFormDataContext);
  const isSubmitDisabled = !isPolicyAccepted || isSubmitting;

  return (
    <>
      <PolicyCheckbox value={isPolicyAccepted} onChange={setIsPolicyAccepted} />
      <Button loading={isSubmitting} disabled={isSubmitDisabled} onClick={startSubmit}>
        {t("payment_page:agree_and_book")}
      </Button>
    </>
  );
}
