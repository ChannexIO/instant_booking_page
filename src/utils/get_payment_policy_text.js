import i18n from "i18next";

const getPaymentPolicyText = (cancellationPolicy) => {
  if (!cancellationPolicy) {
    return null;
  }

  const { guaranteePaymentPolicy, currency, guaranteePaymentAmount, guaranteeCollectedAtDays } = cancellationPolicy;
  const suffix = guaranteeCollectedAtDays !== -1 ? "_at_days" : "";

  if (guaranteePaymentPolicy === "none") {
    return i18n.t("payment_policies:types:not_required");
  }

  const isPercentBased = guaranteePaymentPolicy === "percent_based";
  if (isPercentBased && guaranteePaymentAmount === "100") {
    return i18n.t(`payment_policies:types:full${suffix}`, { days: guaranteeCollectedAtDays });
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

  const policyTextParams = { amount: guaranteePaymentAmount, currency: currencyUnit, days: guaranteeCollectedAtDays };

  return i18n.t(`payment_policies:types:partial${suffix}`, policyTextParams);
};

export default getPaymentPolicyText;
