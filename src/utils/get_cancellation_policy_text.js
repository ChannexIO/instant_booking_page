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

  const unit = cancellationPolicyMode === "percent" ? "%" : currency;

  const cancellationParams = {
    time: cancellationPolicyDeadline,
    timeUnit: cancellationPolicyDeadlineType,
    amount: cancellationPolicyPenalty,
    unit,
  };

  return i18n.t("cancellation_policies:types:deadline_detailed", cancellationParams);
};

export default getCancellationPorlicyText;
