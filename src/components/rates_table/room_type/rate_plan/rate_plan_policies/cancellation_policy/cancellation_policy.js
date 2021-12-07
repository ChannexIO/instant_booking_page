import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

import Alert from "components/alert";

import { DATE_UI_DAY_FORMAT, DATE_UI_MONTH_FORMAT, DATE_UI_YEAR_FORMAT } from "constants/formats";

const DEFAULT_CHECKIN_TIME = "00:00";

const buildNonRefundablePolicyMessage = (t) => {
  return t("cancellation_policies:types:non_refundable");
};

const buildDeadlineBasedPoicyMessage = (t, props) => {
  const { cancellationPolicy, checkinDate, hotelPolicy } = props;
  if (!checkinDate) {
    return null;
  }

  const { cancellationPolicyDeadline, cancellationPolicyDeadlineType } = cancellationPolicy;
  const { checkinTime = DEFAULT_CHECKIN_TIME } = hotelPolicy ?? {};
  const [hour, minute] = checkinTime.split(":");

  const deadlineDate = checkinDate
    .clone()
    .set({ hour, minute, second: 0, millisecond: 0 })
    .subtract(cancellationPolicyDeadline, cancellationPolicyDeadlineType);

  if (deadlineDate.diff(moment()) < 0) {
    return buildNonRefundablePolicyMessage(t);
  }

  const deadlineMonthDay = deadlineDate.format(DATE_UI_DAY_FORMAT);
  const deadlineMonth = deadlineDate.format(DATE_UI_MONTH_FORMAT);
  const deadlineYear = deadlineDate.format(DATE_UI_YEAR_FORMAT);
  const deadlineDay = `${deadlineMonthDay} ${t(`months:${deadlineMonth}`)} ${deadlineYear}`;
  const deadlineHour = deadlineDate.clone().subtract(1, "minute").format("HH:mm");

  return t("cancellation_policies:types:deadline", { deadlineDay, deadlineHour });
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

const getAlertVariant = (cancellationPolicy) => {
  const { cancellationPolicyLogic } = cancellationPolicy;

  if (cancellationPolicyLogic === "non_refundable") {
    return "info";
  }

  return "success";
};

export default function CancellationPolicy(props) {
  const { cancellationPolicy } = props;
  const { t } = useTranslation();

  if (!cancellationPolicy) {
    return null;
  }

  return (
    <Alert text={getPolicyPresentation(t, props)} variant={getAlertVariant(cancellationPolicy)} />
  );
}
