import React from "react";
import { Button } from "react-bootstrap";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import styles from "./integer_input.module.css";

export default function IntegerInput(props) {
  const { label, value, name, maxValue = null, minValue = null, onChange } = props;
  const isDecreaseDisabled = minValue !== null ? value <= minValue : false;
  const isIncreaseDisabled = maxValue !== null ? value >= maxValue : false;

  const handleOccupancyDecrease = () => onChange(value - 1, name);
  const handleOccupancyIncrease = () => onChange(value + 1, name);

  return (
    <div className={styles.container}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.input}>
        <Button
          className={styles.decreaseButton}
          disabled={isDecreaseDisabled}
          onClick={handleOccupancyDecrease}
        >
          <MinusOutlined className={styles.toggleIcon} />
        </Button>
        <div>{value}</div>
        <Button
          className={styles.increaseButton}
          disabled={isIncreaseDisabled}
          onClick={handleOccupancyIncrease}
        >
          <PlusOutlined className={styles.toggleIcon} />
        </Button>
      </div>
    </div>
  );
}
