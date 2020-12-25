import React from 'react';

import BookButton from './book_button';
import SearchButton from './search_button';

import styles from './action_button.module.css';

export default function ActionButton(props) {
  const {
    isRateSelected,
    isDatesSelected,
    missingSpaces,
    currency,
    loading,
    total,
    onBook,
    onSearch
  } = props;

  const buttonComponent = isRateSelected
    ? <BookButton total={total} currency={currency} disabled={!isDatesSelected || missingSpaces} onClick={onBook} />
    : <SearchButton loading={loading} disabled={!isDatesSelected} onClick={onSearch} />;

  return (
    <div className={styles.buttonContainer}>
      {buttonComponent}
    </div>
  );
}
