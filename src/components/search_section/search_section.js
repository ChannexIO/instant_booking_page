import React from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import RangePicker from 'components/rangepicker';

import setUrlParams from 'utils/set_url_params';
import { DATE_FORMAT } from 'constants/formats';

import SearchButton from './search_button';

import styles from './search_section.module.css';

export default function SearchSection({ searchParams, handleSearchChange }) {
  const { t } = useTranslation();
  const history = useHistory();

  const setDatesToUrl = (startDate, endDate) => {
    const formattedDates = {
      startDate:  startDate ? moment(startDate).format(DATE_FORMAT)  : null,
      endDate: endDate ? moment(endDate).format(DATE_FORMAT) : null,
    };

    setUrlParams(formattedDates, history);
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    setDatesToUrl(startDate, endDate);
    
    handleSearchChange({ ...searchParams, startDate, endDate });
  };

  return (
    <Row className={styles.searchSection}>
      <RangePicker
        startDatePlaceholder={t('hotel_page:checkin_placeholder')}
        endDatePlaceholder={t('hotel_page:checkout_placeholder')}
        startDate={searchParams.startDate}
        endDate={searchParams.endDate}
        name="search_dates"
        openDirection="up"
        onDatesChange={handleDatesChange}
      />
      <div className={styles.buttonSection}>
        <SearchButton />
      </div>
    </Row>
  );
}