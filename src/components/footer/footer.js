import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Link from 'components/link'; 

import styles from './footer.module.css';

export default function Footer() {
  const { t } = useTranslation();

 return (
   <div className={styles.footerWrapper}>
    <Container className={styles.footer}>
      <Link href="https://stackoverflow.com/">{t('footer:privacy_policy')}</Link>
      <Link href="https://stackoverflow.com/">{t('footer:terms_and_conditions')}</Link>
      <Link href="https://stackoverflow.com/">{t('footer:copyright_info')}</Link>
    </Container>
   </div>
 );
}