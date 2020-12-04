import React from 'react';

import Overlay from 'components/layout/overlay';
import SearchButton from 'components/search_section/action_button/search_button';

import styles from './reload_container.module.css';

export default function ReloadContainer({ children, disabled, active, onRefresh }) {
  return (
    <div className={styles.container}>
      <Overlay active={active}>
        <div className={styles.content}>
          <SearchButton disabled={disabled} onClick={onRefresh}/>
        </div>
      </Overlay>
      {children}
    </div>
  );
}
