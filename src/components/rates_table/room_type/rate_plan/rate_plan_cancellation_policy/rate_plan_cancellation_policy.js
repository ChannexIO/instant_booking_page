import React from 'react';

export default function RatePlanCancellationPolicy({ ratePlan }) {
  const { cancellationPolicy } = ratePlan;

  return (
    <div>
      {cancellationPolicy}
    </div>
  );
}