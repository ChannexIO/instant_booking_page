import React from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import FieldError from "./field_error";

import styles from "./formal_field.module.css";

export default function FormalField(props) {
  const { name, Component, defaultValue = "" } = props;

  return (
    <div className={styles.container}>
      <Controller
        name={name}
        errorClass={styles.error}
        defaultValue={defaultValue}
        // eslint-disable-next-line react/jsx-props-no-spreading
        render={({ field, fieldState }) => <Component {...props} {...field} {...fieldState} />}
      />
      <ErrorMessage name={name} render={FieldError} />
    </div>
  );
}
