import React from 'react';

import Tooltip from 'components/tooltip';

import PoliciesBreakdown from './policies_breakdown';

export default function PoliciesInfo({ ratePlan }) {
  return (
    <Tooltip>
      <PoliciesBreakdown ratePlan={ratePlan} />
    </Tooltip>
  );
}
