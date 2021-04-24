import React from "react";
import { useTranslation } from "react-i18next";

import Alert from "components/alert";

export default function PaymentPolicy({ cancellationPolicy }) {
  const { t } = useTranslation();

  if (!cancellationPolicy) {
    return null;
  }

  const { guaranteePaymentPolicy } = cancellationPolicy;
  const hasPrepayment = guaranteePaymentPolicy !== "none";

  const policyText = hasPrepayment
    ? t("payment_policies:types:in_advance")
    : t("payment_policies:types:none");
  const alertType = hasPrepayment ? "info" : "success";

  return <Alert text={policyText} variant={alertType} />;
}
