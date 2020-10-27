import React, { useEffect, useState } from 'react';

import Select from 'components/inputs/search_section_select';
import Cell from 'components/layout/cell';

import styles from './rate_plan_occupancy_select.module.css';

export default function RatePlanOccupancySelect({ rateOccupancy, availableSpaces, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(function buildOptionsList() {
    const maxAvailableValue = rateOccupancy + availableSpaces;

    const newOptions = Array.from(Array(maxAvailableValue + 1), (val, index) => {
      return {
        value: index,
        key: index,
      };
    });

    setOptions(newOptions);
  }, [availableSpaces, rateOccupancy]);

  return (
    <Cell className={styles.occupancySelectCell} noPadding>
      <Select
        value={rateOccupancy}
        options={options}
        onChange={onChange}
      />
    </Cell>
  );
}
