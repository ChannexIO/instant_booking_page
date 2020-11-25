import React from 'react';
import { Form } from 'react-bootstrap';

import Label from 'components/label';
import FieldWrapper from 'components/layout/field_wrapper';

import styles from './text_area.module.css';

export default function TextArea(props) {
  const { value = '', label, rows, placeholder, text, meta = {}, onChange } = props;
  const { valid = {} } = meta;

  return (
    <FieldWrapper>
      <Form.Group>
        {label && (
          <Form.Label>
            <Label>
              {label}
            </Label>
          </Form.Label>
        )}
        <Form.Control
          className={styles.textArea}
          as="textarea"
          rows={rows}
          value={value}
          placeholder={placeholder}
          isInvalid={!valid}
          onChange={onChange}
        />
        {text && (
          <Form.Text>
            {text}
          </Form.Text>
        )}
      </Form.Group>
    </FieldWrapper>
  );
}
