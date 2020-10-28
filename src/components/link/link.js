import React from 'react';

import MailIcon from 'static/icons-mail.svg';
import LocationIcon from 'static/icons-maps-pin.svg';
import PhoneIcon from 'static/icons-phone.svg';

import styles from './link.module.css';

const LINK_PROPS_BY_TYPE = {
  url: {
    icon: null,
    prefix: '',
  },
  phone: {
    icon: PhoneIcon,
    prefix: 'tel:',
  },
  mail: {
    icon: MailIcon,
    prefix: 'mailto:',
  },
  default: {
    icon: null,
    prefix: '',
  },
  location: {
    icon: LocationIcon,
    prefix: '',
  },
};

export default function Link({ type = 'url', to = '', children }) {
  const { [type]: linkAttrs = LINK_PROPS_BY_TYPE.default } = LINK_PROPS_BY_TYPE;
  const { icon, prefix } = linkAttrs;

  return (
    <div>
      <a
        className={styles.link}
        href={`${prefix}${to}`}
      >
        <img
          src={icon}
          alt={type}
        />
        <pre className={styles.linkContent}>
          {children}
        </pre>
      </a>
    </div>
  );
}
