import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';
import { CheckOutlined } from '@ant-design/icons';

import Label from 'components/label';
import FieldWrapper from 'components/layout/field_wrapper';

import styles from './checkbox.module.css';

function Checkbox(props, ref) {
  const { value = false, label, name, text, onChange } = props;

  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <FieldWrapper>
      <Form.Group>
        <Form.Label>
          <Label>
            {label}
          </Label>
        </Form.Label>
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
          {value && <CheckOutlined className={styles.checkIcon}/>}
        </label>
        <Form.Text>
          {text}
        </Form.Text>
      </Form.Group>
    </FieldWrapper>
  );
}

export default forwardRef(Checkbox);
