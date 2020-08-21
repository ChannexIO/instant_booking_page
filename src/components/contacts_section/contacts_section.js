import React from 'react';

import ContactInfoCard from './contact_info_card';
import Map from './map';

import styles from './contacts_section.module.css';

export default function ContactsSection({ property }) {
  const { location } = property;

  return (
    <div className={styles.contactsSection}>
      <Map location={location} />
      <ContactInfoCard property={property} />
    </div>
  );
}