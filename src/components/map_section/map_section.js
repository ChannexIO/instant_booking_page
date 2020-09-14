import React from 'react';

import Map from './map';

import styles from './map_section.module.css';

export default function MapSection({ property }) {
  const { location } = property;

  return (
    <div className={styles.contactsSection}>
      <Map location={location} />
    </div>
  );
}