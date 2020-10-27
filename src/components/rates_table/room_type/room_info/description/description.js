import React from 'react';

import Caption from 'components/caption';

export default function Description({ description }) {
  if (!description) {
    return null;
  }

  return (
    <Caption>
      {description}
    </Caption>
  );
}
