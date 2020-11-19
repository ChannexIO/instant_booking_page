import React from 'react';

import Cell from "components/layout/cell";

export default function Title({ property }) {
  return (
    <Cell>
      <h5>
        {property.title}
      </h5>
    </Cell>
  );
}