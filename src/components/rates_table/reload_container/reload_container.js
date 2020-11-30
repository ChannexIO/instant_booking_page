import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import moment from 'moment';

import Overlay from 'components/layout/overlay';
import SearchButton from 'components/search_section/action_button/search_button';

import { BookingActionsContext, BookingDataContext } from 'containers/data_context';

import styles from './reload_container.module.css';

export default function ReloadContainer({ children }) {
  const { roomsInfo, params } = useContext(BookingDataContext);
  const { setParams, loadRoomsInfo } = useContext(BookingActionsContext);
  const { checkinDate = null, checkoutDate = null } = params;
  const disabled = !moment(checkinDate).isValid() || !moment(checkoutDate).isValid();

  const [isStale, setIsStale] = useState(false);
  const prevParamsRef = useRef(params);
  useEffect(() => {
    prevParamsRef.current = params;
  });
  const prevParams = prevParamsRef.current;

  useEffect(function handleSearchParamsChange() {
    const isCheckinDateChanged = params.checkinDate !== prevParams.checkinDate;
    const isCheckoutDateChanged = params.checkoutDate !== prevParams.checkoutDate;

    if (isCheckinDateChanged || isCheckoutDateChanged) {
      setIsStale(true);
      setParams({ ...params, ratesOccupancyPerRoom: {} });
    }
  }, [params, prevParams, setParams]);

  useEffect(function handleRoomsInfoUpdate() {
    setIsStale(false);
  }, [roomsInfo]);

  const handleRefresh = useCallback(() => {
    loadRoomsInfo();
  }, [loadRoomsInfo]);

  return (
    <div className={styles.container}>
      <Overlay active={isStale}>
        <div className={styles.content}>
          <SearchButton disabled={disabled} onClick={handleRefresh}/>
        </div>
      </Overlay>
      {children}
    </div>
  );
}
