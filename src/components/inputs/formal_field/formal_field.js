import React from 'react';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import FieldError from './field_error';

import styles from './formal_field.module.css';

export default function FormalField(props) {
  const { name } = props;

  return (
    <div className={styles.container}>
      <Controller
        errorClass={styles.error}
        defaultValue=""
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      <ErrorMessage name={name} render={FieldError} />
    </div>
  );
}
