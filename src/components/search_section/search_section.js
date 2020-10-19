import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { useMedia } from 'react-media';

import { BookingActionsContext, BookingDataContext } from 'containers/data_context';

import MEDIA_QUERIES from 'constants/media_queries';

import ChildrenAgeSettings from './children_age_settings';
import DateSelect from './date_select';
import OccupancySetting from './occupancy_settings';
import SearchButton from './search_button';

import styles from './search_section.module.css';

export default function SearchSection() {
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const isMobile = matchedQueries.xs || matchedQueries.sm;
  const { params } = useContext(BookingDataContext);
  const { setParams } = useContext(BookingActionsContext);

  return (
    <Row className={styles.searchSection}>
      <div className={styles.searchRow}>
        <DateSelect bookingParams={params} handleSearchChange={setParams} />
        {!isMobile && (
          <SearchButton />
        )}
      </div>
      <OccupancySetting bookingParams={params} isMobile={isMobile} handleSearchChange={setParams} />
      <ChildrenAgeSettings bookingParams={params} handleSearchChange={setParams} />
      {isMobile && (
        <SearchButton />
      )}
    </Row>
  );
}
