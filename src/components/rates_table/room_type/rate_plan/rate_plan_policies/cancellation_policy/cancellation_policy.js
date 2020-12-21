import React from 'react';
import { useTranslation } from 'react-i18next';

import Alert from 'components/alert';

import { DATE_UI_FULL_MONTH_FORMAT } from 'constants/formats';

const buildNonRefundablePolicyMessage = (t) => {
  return t('cancellation_policies:types:non_refundable');
};

const getDeadlineAmount = (cancellationPolicy, lengthOfStay) => {
  const { cancellationPolicyMode, cancellationPolicyPenalty, currency } = cancellationPolicy;

  const amount = cancellationPolicyMode === 'percent'
    ? `${cancellationPolicyPenalty}%`
    : `${cancellationPolicyPenalty * lengthOfStay} ${currency}`;

  return amount;
};

const buildDeadlineBasedPoicyMessage = (t, policy, checkinDate, lengthOfStay) => {
  if (!checkinDate) {
    return null;
  }

  const { cancellationPolicyDeadline, cancellationPolicyDeadlineType } = policy;

  const deadlineDate = checkinDate
    .clone()
    .subtract(cancellationPolicyDeadline, cancellationPolicyDeadlineType);

  const deadlineDay = deadlineDate.format(DATE_UI_FULL_MONTH_FORMAT);
  const deadlineHour = deadlineDate.clone().subtract(1, 'minute').format('HH:mm');
  const amount = getDeadlineAmount(policy, lengthOfStay);

  return t('cancellation_policies:types:deadline', { deadlineDay, deadlineHour, amount });
};

const buildFreePolicyMessage = (t) => {
  return t('cancellation_policies:types:free');
};

const getPolicyPresentation = (t, policy, checkinDate, lengthOfStay) => {
  const policyPresentationBuilders = {
    deadline: buildDeadlineBasedPoicyMessage,
    non_refundable: buildNonRefundablePolicyMessage,
    free: buildFreePolicyMessage,
  };

  const policyHandler = policyPresentationBuilders[policy.cancellationPolicyLogic];

  return policyHandler(t, policy, checkinDate, lengthOfStay);
};

export default function CancellationPolicy({ cancellationPolicy, checkinDate, lengthOfStay }) {
  const { t } = useTranslation();

  if (!cancellationPolicy) {
    return null;
  }

  return (
    <Alert
      text={getPolicyPresentation(t, cancellationPolicy, checkinDate, lengthOfStay)}
      variant="success"
    />
  );
}
