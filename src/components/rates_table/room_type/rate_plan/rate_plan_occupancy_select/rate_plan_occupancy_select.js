import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from './rate_plan_occupancy_select.module.css';

export default function RatePlanOccupancySelect({ rateOccupancy, availableSpaces, onChange }) {
  const isDecreaseDisabled = rateOccupancy <= 0;
  const isIncreaseDisabled = availableSpaces <= 0;

  const handleOccupancyDecrease = useCallback(() => onChange(rateOccupancy - 1), [rateOccupancy, onChange]);
  const handleOccupancyIncrease = useCallback(() => onChange(rateOccupancy + 1), [rateOccupancy, onChange]);

  return (
    <div className={styles.occupancySelectContainer}>
      <Button
        className={styles.occupancyDecreaseButton}
        disabled={isDecreaseDisabled}
        onClick={handleOccupancyDecrease}
      >
        <MinusOutlined className={styles.toggleIcon} />
      </Button>
      <div>{rateOccupancy}</div>
      <Button
        className={styles.occupancyIncreaseButton}
        disabled={isIncreaseDisabled}
        onClick={handleOccupancyIncrease}
      >
        <PlusOutlined className={styles.toggleIcon} />
      </Button>
    </div>
  );
}