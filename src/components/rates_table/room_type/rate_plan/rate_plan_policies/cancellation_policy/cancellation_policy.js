import React from 'react';
import { useTranslation } from 'react-i18next';

import Alert from 'components/alert';

import { DATE_UI_FULL_MONTH_FORMAT } from 'constants/formats';

const buildNonRefundablePolicyMessage = (t) => {
  return t('cancellation_policies:types:non_refundable');
};

const buildDeadlineBasedPoicyMessage = (t, policy, checkinDate) => {
  if (!checkinDate) {
    return null;
  }
  const { cancellationPolicyDeadline, cancellationPolicyDeadlineType } = policy;

  const deadline = checkinDate
    .subtract(cancellationPolicyDeadline, cancellationPolicyDeadlineType)
    .format(DATE_UI_FULL_MONTH_FORMAT);

  return t('cancellation_policies:types:deadline').replace('{date}', deadline);
};

const buildFreePolicyMessage = (t) => {
  return t('cancellation_policies:types:free');
};

const getPolicyPresentation = (t, policy, checkinDate) => {
  const policyPresentationBuilders = {
    deadline: buildDeadlineBasedPoicyMessage,
    non_refundable: buildNonRefundablePolicyMessage,
    free: buildFreePolicyMessage,
  };

  return policyPresentationBuilders[policy.cancellationPolicyLogic](t, policy, checkinDate);
};

export default function CancellationPolicy({ cancellationPolicy, checkinDate }) {
  const { t } = useTranslation();

  if (!cancellationPolicy) {
    return null;
  }

  return (
    <Alert
      text={getPolicyPresentation(t, cancellationPolicy, checkinDate)}
      variant="success"
    />
  );
}
