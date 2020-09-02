import React from 'react';
import { Row } from 'react-bootstrap';
import { useMedia } from 'react-media';

import MEDIA_QUERIES from 'constants/media_queries';
import DateSelect from './date_select';
import SearchButton from './search_button';
import OccupancySetting from './occupancy_settings';
import ChildrenAgeSettings from './children_age_settings';


import styles from './search_section.module.css';

export default function SearchSection({ searchParams, handleSearchChange }) {
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const isMobile = matchedQueries.xs || matchedQueries.sm;

  // TODO - make buttoin render less ugly
  return (
    <Row className={styles.searchSection}>
      <div className={styles.searchRow}>
        <DateSelect searchParams={searchParams} handleSearchChange={handleSearchChange} />
        {!isMobile && (
          <div className={styles.buttonSection}>
            <SearchButton />
          </div>
        )}
      </div>
      <OccupancySetting searchParams={searchParams} isMobile={isMobile} handleSearchChange={handleSearchChange} />
      <ChildrenAgeSettings searchParams={searchParams} handleSearchChange={handleSearchChange} />
      {isMobile && (
          <div className={styles.buttonSection}>
            <SearchButton />
          </div>
        )}
    </Row>
  );
}