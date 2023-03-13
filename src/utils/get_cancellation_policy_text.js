import i18n from "i18next";

const getCancellationPorlicyText = (cancellationPolicy) => {
  if (!cancellationPolicy) {
    return null;
  }

  const {
    cancellationPolicyLogic,
    cancellationPolicyDeadline,
    cancellationPolicyDeadlineType,
    cancellationPolicyPenalty,
    currency,
    cancellationPolicyMode,
  } = cancellationPolicy;

  if (cancellationPolicyLogic === "non_refundable") {
    return i18n.t("cancellation_policies:types:non_refundable_detailed");
  }

  if (cancellationPolicyLogic === "free") {
    return i18n.t("cancellation_policies:types:free_detailed");
  }

  let unit;
  switch (cancellationPolicyMode) {
    case "percent":
      unit = "%";
      break;

    case "nights":
      unit = i18n.t("rates_table:night");
      break;

    default:
      unit = currency;
      break;
  }

  const cancellationParams = {
    time: cancellationPolicyDeadline,
    timeUnit: cancellationPolicyDeadlineType,
    amount: cancellationPolicyPenalty,
    unit,
  };

  return i18n.t("cancellation_policies:types:deadline_detailed", cancellationParams);
};

export default getCancellationPorlicyText;
