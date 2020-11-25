import React from 'react';
import { Form } from 'react-bootstrap';

import Label from 'components/label';
import FieldWrapper from 'components/layout/field_wrapper';

import styles from './input.module.css';

export default function Input(props) {
  const { value = '', label, placeholder, type, text, valid = true, onChange } = props;

  return (
    <FieldWrapper>
      <Form.Group>
        <Form.Label>
          <Label>
            {label}
          </Label>
        </Form.Label>
        <Form.Control
          className={styles.input}
          as="input"
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
