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

  let currencyUnit;

  switch (guaranteePaymentPolicy) {
    case "percent_based":
      currencyUnit = "%";
      break;

    case "nights_based":
      currencyUnit =
        guaranteePaymentAmount === "1" ? i18n.t("rates_table:night") : i18n.t("rates_table:nights");
      break;

    default:
      currencyUnit = currency;
      break;
  }

  const policyTextParams = { amount: guaranteePaymentAmount, currency: currencyUnit };

  return i18n.t("payment_policies:types:partial", policyTextParams);
};

export default getPaymentPolicyText;
