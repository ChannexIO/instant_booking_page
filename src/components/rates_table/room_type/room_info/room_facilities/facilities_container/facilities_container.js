import React from 'react';

import Facility from 'components/faclitily';

import styles from './facilities_container.module.css';

export default function FacilitiesContainer({ facilities }) {
  return (
    <div className={styles.facilitiesContainer}>
      {facilities.map((code) => <Facility code={code} key={code} />)}
    </div>
  );
}
