import i18n from "i18next";

const buildAfterReservationMessage = (cancellationPolicy) => {
  const {
    cancellationPolicyLogic,
    cancellationPolicyDeadline,
    cancellationPolicyDeadlineType,
  } = cancellationPolicy;
  const afterReservationCancellationLogic = cancellationPolicy.afterReservationCancellationLogic;

  let output;

  if (afterReservationCancellationLogic === "free" || !afterReservationCancellationLogic) {
    if (cancellationPolicyLogic === "non_refundable" && !cancellationPolicyDeadline) {
      output = i18n.t("cancellation_policies:types:non_refundable");
    } else if (cancellationPolicyLogic === "deadline" && cancellationPolicyDeadline) {
      output = i18n.t("cancellation_policies:after_reservation:free_with_deadline", {
        time: cancellationPolicyDeadline,
        unit: cancellationPolicyDeadlineType,
      });
    } else {
      output = `${i18n.t("cancellation_policies:types:free")}. `;
    }
  }

  if (afterReservationCancellationLogic === "non_refundable") {
    output = i18n.t("cancellation_policies:types:non_refundable");
  }

  if (afterReservationCancellationLogic === "guarantee_amount") {
    if (cancellationPolicyDeadline) {
      output = i18n.t("cancellation_policies:after_reservation:guarantee_amount");
    } else {
      output = i18n.t("cancellation_policies:after_reservation:guarantee_amount_without_deadline");
    }
  }

  if (afterReservationCancellationLogic === "nights_based") {
    if (cancellationPolicyDeadline) {
      output = i18n.t("cancellation_policies:after_reservation:night_based", {
        amount: cancellationPolicy.afterReservationCancellationAmount,
      });
    } else {
      output = i18n.t("cancellation_policies:after_reservation:night_based_without_deadline", {
        amount: cancellationPolicy.afterReservationCancellationAmount,
      });
    }
  }

  if (afterReservationCancellationLogic === "percent_based") {
    if (cancellationPolicyDeadline) {
      output = i18n.t("cancellation_policies:after_reservation:percent_based", {
        amount: cancellationPolicy.afterReservationCancellationAmount,
      });
    } else {
      output = i18n.t("cancellation_policies:after_reservation:percent_based_without_deadline", {
        amount: cancellationPolicy.afterReservationCancellationAmount,
      });
    }
  }

  return output;
};

const buildDeadlineBasedPoicyMessage = (cancellationPolicy) => {
  const {
    cancellationPolicyLogic,
    cancellationPolicyDeadline,
    cancellationPolicyDeadlineType,
    cancellationPolicyPenalty,
    currency,
    cancellationPolicyMode,
  } = cancellationPolicy;
  let output = "";

  if (
    (cancellationPolicyLogic === "non_refundable" || cancellationPolicyLogic === "deadline") &&
    cancellationPolicyDeadline
  ) {
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

    if (cancellationPolicyLogic === "non_refundable") {
      output = i18n.t("cancellation_policies:types:non_refundable_message", cancellationParams);
    } else {
      output = i18n.t("cancellation_policies:types:deadline_message", cancellationParams);
    }
  }

  return output;
};

const getCancellationPorlicyText = (cancellationPolicy) => {
  if (!cancellationPolicy) {
    return null;
  }

  const afterReservationCancellationMessage = buildAfterReservationMessage(cancellationPolicy);
  const deadlineBasedPolicyMessage = buildDeadlineBasedPoicyMessage(cancellationPolicy);

  return afterReservationCancellationMessage + deadlineBasedPolicyMessage;
};

export default getCancellationPorlicyText;
