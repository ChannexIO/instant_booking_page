import React from 'react';
import { useTranslation } from 'react-i18next';

import Label from 'components/label';
import Separator from 'components/layout/separator';

import IconConfirmationEmail from 'static/icons-confirmation-email.svg';

import styles from './thank_panel.module.css';

export default function ThankPanel({ email, bookingId }) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <img
          src={IconConfirmationEmail}
          alt="Icon Confirm"
        />
        <h6>{t('confirmation_page:thank_you')}</h6>
        <Label>{t('confirmation_page:your_number')}:</Label>
        <Separator />
        <div className={styles.confirmationNumber}>
          {bookingId}
        </div>
        <Separator />
        <Label>{t('confirmation_page:confirmation_sent_to')}:</Label>
        <div>{email}</div>
      </div>
    </div>
  );
}
