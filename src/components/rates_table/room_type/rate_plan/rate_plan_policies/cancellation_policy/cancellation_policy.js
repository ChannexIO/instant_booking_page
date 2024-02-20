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
  const deadlineDay = `${deadlineMonthDay} ${deadlineMonth} ${deadlineYear}`;
  const deadlineHour = deadlineDate.clone().subtract(1, "minute").format("HH:mm");

  return t("cancellation_policies:types:deadline", { deadlineDay, deadlineHour });
};

const buildFreePolicyMessage = (t) => {
  return t("cancellation_policies:types:free");
};

const buildGuaranteeAmountPolicyMessage = (t, _props) => {
  return t("cancellation_policies:types:guarantee_non_refundable");
};

const buildPenaltyPolicyMessage = (t, _props) => {
  return t("cancellation_policies:types:partial_refund");
};

const getPolicyPresentation = (t, props) => {
  const { cancellationPolicy } = props;
  const afterReservationCancellationLogic = cancellationPolicy.afterReservationCancellationLogic;
  const cancellationPolicyLogic = cancellationPolicy.cancellationPolicyLogic;

  const policyPresentationBuilders = {
    "-free": buildFreePolicyMessage,
    "-non_refundable": buildNonRefundablePolicyMessage,
    "-deadline": buildDeadlineBasedPoicyMessage,

    "free-free": buildFreePolicyMessage,
    "non_refundable-free": buildNonRefundablePolicyMessage,
    "guarantee_amount-free": buildGuaranteeAmountPolicyMessage,
    "nights_based-free": buildPenaltyPolicyMessage,
    "percent_based-free": buildPenaltyPolicyMessage,

    "free-non_refundable": buildDeadlineBasedPoicyMessage,
    "non_refundable-non_refundable": buildNonRefundablePolicyMessage,
    "guarantee_amount-non_refundable": buildGuaranteeAmountPolicyMessage,
    "nights_based-non_refundable": buildPenaltyPolicyMessage,
    "percent_based-non_refundable": buildPenaltyPolicyMessage,

    "free-deadline": buildDeadlineBasedPoicyMessage,
    "non_refundable-deadline": buildNonRefundablePolicyMessage,
    "guarantee_amount-deadline": buildGuaranteeAmountPolicyMessage,
    "nights_based-deadline": buildPenaltyPolicyMessage,
    "percent_based-deadline": buildPenaltyPolicyMessage,
  };

  const policyHandler =
    policyPresentationBuilders[
      `${afterReservationCancellationLogic}-${cancellationPolicyLogic}`
    ];

  return policyHandler(t, props);
};

const getAlertVariant = (cancellationPolicy) => {
  const { cancellationPolicyLogic, afterReservationCancellationLogic } = cancellationPolicy;

  if (
    cancellationPolicyLogic === "non_refundable" ||
    afterReservationCancellationLogic !== "free"
  ) {
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
