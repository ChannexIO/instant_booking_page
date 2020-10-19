import React from 'react';
import { LinkOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

import styles from './link.module.css';

const LINK_PROPS_BY_TYPE = {
  url: {
    Icon: LinkOutlined,
    prefix: '',
  },
  phone: {
    Icon: PhoneOutlined,
    prefix: 'tel:',
  },
  mail: {
    Icon: MailOutlined,
    prefix: 'mailto:',
  },
  default: {
    Icon: null,
    prefix: '',
  },
};

export default function Link({ type = 'url', to, children }) {
  const { [type]: linkAttrs = LINK_PROPS_BY_TYPE.default } = LINK_PROPS_BY_TYPE;
  const { Icon, prefix } = linkAttrs;

  return (
    <a
      className={styles.link}
      href={`${prefix}${to}`}
    >
      <Icon className={styles.linkIcon} />
      {children}
    </a>
  );
}
