import React, { useCallback, useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import Actions from 'actions';

import getSearchParamsFromUrl from './get_search_params_from_url';
import convertClosedDatesToClientFormat from './convert_closed_dates_to_client_format';

const DataContext = React.createContext();
const ActionsContext = React.createContext();

const EMPTY_DATA_ENTRY = {
  data: null,
  isLoading: false,
};

const DEFAULT_APP_DATA = {
  property: EMPTY_DATA_ENTRY,
  roomsInfo: EMPTY_DATA_ENTRY,
  closedDates: EMPTY_DATA_ENTRY,
};

const DataContextProvider = (props) => {
  const [channelId, setChannelId ] = useState(null);
  
  const [searchParams, setSearchParams] = useState(null);
  const [property, setProperty] = useState(EMPTY_DATA_ENTRY);
  const [roomsInfo, setRoomsInfo] = useState(EMPTY_DATA_ENTRY);
  const [closedDates, setClosedDates] = useState(EMPTY_DATA_ENTRY);

  const [appData, setAppData] = useState(DEFAULT_APP_DATA);
  const [appActions, setAppActions] = useState({});
  
  const location = useLocation();

  const loadPropertyInfo = useCallback(async () => {
    setProperty({ ...property, isLoading: true });

    const data = await Actions.getPropertyInfo(channelId);

    setProperty({ data, isLoading: false });
  }, [channelId, property]);

  const loadClosedDates = useCallback(async () => {
    setClosedDates({ ...closedDates, isLoading: true });

    const rawData = await Actions.getClosedDates(channelId);
    const data = convertClosedDatesToClientFormat(rawData);

    setClosedDates({ data, isLoading: false });
  }, [channelId, closedDates]);

  const loadRoomsInfo = useCallback(async () => {
    setRoomsInfo({ ...roomsInfo, isLoading: true });
    
    const data = await Actions.getRoomsInfo(channelId, searchParams);

    setRoomsInfo({ data, isLoading: false });
  }, [channelId, roomsInfo, searchParams]);

  const setSearchParamsFromUrl = useCallback(() => {
    const searchParams = getSearchParamsFromUrl();

    setSearchParams(searchParams);
  }, []);

  const getChannelId = useCallback(() => {
    const matchedPath = matchPath(location.pathname, { path: '/:channelId'});

    if (!matchedPath) {
      return null;
    }

    return matchedPath.params.channelId;
  }, [location]);

  useEffect(function initChannelId() {
    const newChannelId = getChannelId();

    setChannelId(newChannelId);
  }, [location]);

  useEffect(function loadInitialData() {
    if (!channelId) {
      return;
    }

    loadPropertyInfo();
    loadClosedDates();
    setSearchParamsFromUrl();
  }, [channelId]);

  useEffect(function handleSearchParamsChange() {
    if (!channelId || !searchParams) {
      return;
    }

    loadRoomsInfo();
  }, [searchParams, channelId]);

  useEffect(function buildAppData() {
    setAppData({
      property,
      roomsInfo,
      closedDates,
      searchParams,
    });
  }, [property, roomsInfo, closedDates, searchParams]);

  useEffect(function buildAppActions() {
    setAppActions({
      loadPropertyInfo,
      loadRoomsInfo,
      loadClosedDates,
      setSearchParams,
    });
  }, [loadPropertyInfo, loadClosedDates, loadRoomsInfo, setSearchParams]);

  return (
    <ActionsContext.Provider value={appActions}>
      <DataContext.Provider value={appData}>
        {props.children}
      </DataContext.Provider>
    </ActionsContext.Provider>
  );
};

export { DataContextProvider, DataContext, ActionsContext };
