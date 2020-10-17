import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { useMedia } from 'react-media';

import { ActionsContext, DataContext } from 'containers/data_context';

import MEDIA_QUERIES from 'constants/media_queries';
import DateSelect from './date_select';
import SearchButton from './search_button';
import OccupancySetting from './occupancy_settings';
import ChildrenAgeSettings from './children_age_settings';

import styles from './search_section.module.css';

export default function SearchSection() {
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const isMobile = matchedQueries.xs || matchedQueries.sm;
  const { params } = useContext(DataContext);
  const { setBookingParams } = useContext(ActionsContext);

  // TODO - make buttoin render less ugly
  return (
    <Row className={styles.searchSection}>
      <div className={styles.searchRow}>
        <DateSelect bookingParams={params} handleSearchChange={setBookingParams} />
        {!isMobile && (
          <div className={styles.buttonSection}>
            <SearchButton />
          </div>
        )}
      </div>
      <OccupancySetting bookingParams={params} isMobile={isMobile} handleSearchChange={setBookingParams} />
      <ChildrenAgeSettings bookingParams={params} handleSearchChange={setBookingParams} />
      {isMobile && (
          <div className={styles.buttonSection}>
            <SearchButton />
          </div>
        )}
    </Row>
  );
}