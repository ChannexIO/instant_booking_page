import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";
import { CheckOutlined } from "@ant-design/icons";

import Label from "components/label";

import styles from "./checkbox.module.css";

function Checkbox(props, ref) {
  const { value = false, label, name, onChange } = props;

  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <Form.Group className={styles.group}>
      <label htmlFor={name} className={styles.checkboxLabel}>
        <Form.Check.Input
          className={styles.checkbox}
          ref={ref}
          type="checkbox"
          checked={value}
          custom
          onChange={handleToggle}
          id={name}
        />
        {value && <CheckOutlined className={styles.checkIcon} />}
      </label>
      <Form.Label className={styles.label}>
        <Label>{label}</Label>
      </Form.Label>
    </Form.Group>
  );
}

export default forwardRef(Checkbox);
