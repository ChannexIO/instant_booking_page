import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Link from 'components/link';

import InfoCardEntry from './info_card_entry';

import styles from './contact_info_card.module.css';

export default function ContactInfoCard({ property }) {
  const { t } = useTranslation();
  const { address, phone, email } = property;

  return (
    <Card className={styles.infoCard}>
      <Card.Body className={styles.infoCardBody}>
        <div className={styles.cardTitle}>{t('hotel_page:contact_information')}</div>
        <div className={styles.cardMessage}>{t('hotel_page:contact_information_message')}</div>

        {address && <InfoCardEntry name="address">{address}</InfoCardEntry>}
        {phone && <InfoCardEntry name="phone"><Link type="phone" to={phone}>{phone}</Link></InfoCardEntry>}
        {email && <InfoCardEntry name="email"><Link type="mail" to={email}>{email}</Link></InfoCardEntry>}
      </Card.Body>
    </Card>
  );
}