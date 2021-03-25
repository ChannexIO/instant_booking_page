import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";

import Label from "components/label";
import FieldWrapper from "components/layout/field_wrapper";

import styles from "./text_area.module.css";

function TextArea(props, ref) {
  const { value = "", label, rows, placeholder, text, meta = {}, onChange } = props;
  const { valid = {} } = meta;

  return (
    <FieldWrapper>
      <Form.Group>
        {label && (
          <Form.Label>
            <Label>{label}</Label>
          </Form.Label>
        )}
        <Form.Control
          className={styles.textArea}
          as="textarea"
          ref={ref}
          rows={rows}
          value={value}
          placeholder={placeholder}
          isInvalid={!valid}
          onChange={onChange}
        />
        {text && <Form.Text>{text}</Form.Text>}
      </Form.Group>
    </FieldWrapper>
  );
}

export default forwardRef(TextArea);
