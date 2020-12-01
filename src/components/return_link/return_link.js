import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import styles from './return_link.module.css';

export default function ReturnLink({ to, children }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(to);
  };

  return (
    <div className={styles.container}>
      <Button
        variant="link"
        className={styles.button}
        onClick={handleClick}
      >
        <LeftOutlined className={styles.icon} />
        {children}
      </Button>
    </div>
  );
}
