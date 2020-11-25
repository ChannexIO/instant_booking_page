import React, { useCallback, useEffect, useState } from 'react';

import MaterialSelect from 'components/inputs/material_select';
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

  const handleChange = useCallback((newValue) => {
    onChange(Number(newValue));
  }, [onChange]);

  return (
    <Cell className={styles.occupancySelectCell} noPadding>
      <MaterialSelect
        value={rateOccupancy}
        options={options}
        onChange={handleChange}
      />
    </Cell>
  );
}
