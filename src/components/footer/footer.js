import React from 'react';

import Link from 'components/link';
import SectionTitle from 'components/section_title';

import styles from './footer.module.css';

export default function Footer({ property }) {
  const { title, address, email = 'email@placeholder.zxc', phone = 'phoneplaceholder' } = property;

  return (
    <div className={styles.footerWrapper}>
      <SectionTitle>
        {title}
      </SectionTitle>
      <div className={styles.footer}>
        {address && <Link to="#/" type="location">{address}</Link>}
        {email && <Link to={email} type="mail">{email}</Link>}
        {phone && <Link to={phone} type="phone">{phone}</Link>}
      </div>
    </div>
  );
}
