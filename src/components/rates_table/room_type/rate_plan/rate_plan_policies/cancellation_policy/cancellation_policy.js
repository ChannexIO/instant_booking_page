import React from "react";
import { useTranslation } from "react-i18next";

import Alert from "components/alert";

import { DATE_UI_FULL_MONTH_FORMAT } from "constants/formats";

const DEFAULT_CHECKIN_TIME = "00:00";

const buildNonRefundablePolicyMessage = (t) => {
  return t("cancellation_policies:types:non_refundable");
};

const getDeadlineAmount = (cancellationPolicy, lengthOfStay) => {
  const { cancellationPolicyMode, cancellationPolicyPenalty, currency } = cancellationPolicy;

  const amount =
    cancellationPolicyMode === "percent"
      ? `${cancellationPolicyPenalty}%`
      : `${cancellationPolicyPenalty * lengthOfStay} ${currency}`;

  return amount;
};

const buildDeadlineBasedPoicyMessage = (t, props) => {
  const { cancellationPolicy, checkinDate, lengthOfStay, hotelPolicy } = props;
  if (!checkinDate) {
    return null;
  }

  const { cancellationPolicyDeadline, cancellationPolicyDeadlineType } = cancellationPolicy;
  const { checkinTime = DEFAULT_CHECKIN_TIME } = hotelPolicy;
  const [hour, minute] = checkinTime.split(":");

  const deadlineDate = checkinDate
    .clone()
    .set({ hour, minute, second: 0, millisecond: 0 })
    .subtract(cancellationPolicyDeadline, cancellationPolicyDeadlineType);

  const deadlineDay = deadlineDate.format(DATE_UI_FULL_MONTH_FORMAT);
  const deadlineHour = deadlineDate.clone().subtract(1, "minute").format("HH:mm");
  const amount = getDeadlineAmount(cancellationPolicy, lengthOfStay);

  return t("cancellation_policies:types:deadline", { deadlineDay, deadlineHour, amount });
};

const buildFreePolicyMessage = (t) => {
  return t("cancellation_policies:types:free");
};

const getPolicyPresentation = (t, props) => {
  const { cancellationPolicy } = props;

  const policyPresentationBuilders = {
    deadline: buildDeadlineBasedPoicyMessage,
    non_refundable: buildNonRefundablePolicyMessage,
    free: buildFreePolicyMessage,
  };

  const policyHandler = policyPresentationBuilders[cancellationPolicy.cancellationPolicyLogic];

  return policyHandler(t, props);
};

export default function CancellationPolicy(props) {
  const { cancellationPolicy } = props;
  const { t } = useTranslation();

  if (!cancellationPolicy) {
    return null;
  }

  return <Alert text={getPolicyPresentation(t, props)} variant="success" />;
}
