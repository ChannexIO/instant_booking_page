import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ApiActions from 'api_actions';

import Currency from 'components/currency';

import { HOTEL_INFO_SECTION } from 'constants/element_ids';
import scrollToElementById from 'utils/scroll_to_element_by_id';

import styles from './min_price_panel.module.css';

const handleClick = (e) => {
  e.preventDefault();

  scrollToElementById(HOTEL_INFO_SECTION);
};

export default function MinPricePanel({ channelId, params }) {
  const [minPriceParams, setMinPriceParams] = useState(null);
  const { t } = useTranslation();
  const { currency, checkinDate, checkoutDate } = params;
  const hasEnteredDates = checkinDate && checkoutDate;

  const updateMinPriceParams = useCallback(async () => {
    if (!currency) {
      return;
    }

    try {
      const requestParams = {
        currency,
        checkinDate,
        checkoutDate,
      };

      const newMinPriceParams = await ApiActions.getBestOffer(channelId, requestParams);

      setMinPriceParams(newMinPriceParams);
    } catch (_e) {
      setMinPriceParams(null);
    }
  }, [channelId, currency, checkinDate, checkoutDate]);

  useEffect(function callMinPriceUpdate() {
    updateMinPriceParams();
  }, [updateMinPriceParams]);

  if (!minPriceParams) {
    return null;
  }

  return (
    <a
      className={styles.minPriceContainer}
      onClick={handleClick}
      href="/"
    >
      <div className={styles.minPriceContent}>
        {t('hotel_page:price_from')}
        <Currency
          className={styles.minPrice}
          amount={minPriceParams.offer}
          currency={minPriceParams.currency}
        />
        {!hasEnteredDates && t('hotel_page:price_per_night')}
      </div>
    </a>
  );
}
