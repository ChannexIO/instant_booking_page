import i18n from "i18next";

const getPaymentPolicyText = (cancellationPolicy) => {
  if (!cancellationPolicy) {
    return null;
  }

  const { guaranteePaymentPolicy, currency, guaranteePaymentAmount } = cancellationPolicy;

  if (guaranteePaymentPolicy === "none") {
    return i18n.t("payment_policies:types:not_required");
  }

  const isPercentBased = guaranteePaymentPolicy === "percent_based";
  if (isPercentBased && guaranteePaymentAmount === 100) {
    return i18n.t("payment_policies:types:full");
  }

  const currencyUnit = isPercentBased ? "%" : currency;
  const policyTextParams = { amount: guaranteePaymentAmount, currency: currencyUnit };

  return i18n.t("payment_policies:types:partial", policyTextParams);
};

export default getPaymentPolicyText;
