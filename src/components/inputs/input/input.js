import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

import Label from 'components/label';
import FieldWrapper from 'components/layout/field_wrapper';

import styles from './input.module.css';

function Input(props, ref) {
  const { value = '', label, placeholder, disabled, type, text, valid = true, onChange } = props;

  return (
    <FieldWrapper>
      <Form.Group>
        <Form.Label>
          <Label>
            {label}
          </Label>
        </Form.Label>
        <Form.Control
          disabled={disabled}
          className={styles.input}
          as="input"
          ref={ref}
          value={value}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          isInvalid={!valid}
        />
        <Form.Text>
          {text}
        </Form.Text>
      </Form.Group>
    </FieldWrapper>
  );
}

export default forwardRef(Input);
