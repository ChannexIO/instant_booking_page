import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Link from 'components/link'; 

import styles from './footer.module.css';

export default function Footer() {
  const { t } = useTranslation();

 return (
   <div className={styles.footerWrapper}>
    <Container className={styles.footer}>
      <Link>{t('footer:privacy_policy')}</Link>
      <Link>{t('footer:terms_and_conditions')}</Link>
      <Link>{t('footer:copyright_info')}</Link>
    </Container>
   </div>
 );
}