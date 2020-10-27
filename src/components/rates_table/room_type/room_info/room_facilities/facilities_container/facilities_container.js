import React from 'react';

import Caption from 'components/caption';

const FACILITY_DIVIDER = ' · ';

export default function FacilitiesContainer({ facilities }) {
  return (
    <Caption variant="green">
      {facilities.join(FACILITY_DIVIDER)}
    </Caption>
  );
}
