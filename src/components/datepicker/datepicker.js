import React from 'react';
import ReactDatepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMedia } from 'react-media';

import { DATEPICKER_DATE_FORMAT } from "constants/formats";
import MEDIA_QUERIES from "constants/media_queries";

import styles from "./datepicker.module.css";

const Datepicker = React.forwardRef((props, ref) => {
  const { label, ...datepickerProps } = props;
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const showPortal = matchedQueries.xs;

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {label}:
      </div>
      <ReactDatepicker
        ref={ref}
        dateFormat={DATEPICKER_DATE_FORMAT}
        withPortal={showPortal}
        {...datepickerProps}
        className={styles.datepicker}
      />
    </div>
  )
})

export default Datepicker;