import React from 'react';

import MailIcon from 'static/icons-mail.svg';
import LocationIcon from 'static/icons-maps-pin.svg';
import PhoneIcon from 'static/icons-phone.svg';

import styles from './link.module.css';

const LINK_PROPS_BY_TYPE = {
  url: {
    icon: null,
    prefix: '',
    interactive: true,
  },
  phone: {
    icon: PhoneIcon,
    prefix: 'tel:',
    interactive: true,
  },
  mail: {
    icon: MailIcon,
    prefix: 'mailto:',
    interactive: true,
  },
  default: {
    icon: null,
    prefix: '',
    interactive: true,
  },
  location: {
    icon: LocationIcon,
    prefix: '',
    interactive: false,
  },
};

export default function Link({ type = 'url', to = '', children }) {
  const { [type]: linkAttrs = LINK_PROPS_BY_TYPE.default } = LINK_PROPS_BY_TYPE;
  const { icon, prefix, interactive } = linkAttrs;

  return (
    <span>
      <a
        className={styles.link}
        href={`${prefix}${to}`}
        disabled={!interactive}
      >
        {icon && (
          <img
            className={styles.icon}
            src={icon}
            alt={type}
          />
        )}
        <pre className={styles.linkContent}>
          {children}
        </pre>
      </a>
    </span>
  );
}
