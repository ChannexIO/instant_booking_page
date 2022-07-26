import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FrownOutlined } from "@ant-design/icons";
import moment from "moment";

import LoadingContainer from "components/loading_container";
import Placeholder from "components/placeholder";

import { BookingActionsContext, BookingDataContext } from "containers/data_context";

import RatesTableHeader from "./rates_table_header";
import ReloadContainer from "./reload_container";
import RoomType from "./room_type";

import styles from "./rates_table.module.css";

const DEFAULT_OCCUPANCY_PER_ROOM = {};

export default function RatesTable() {
  const [isStale, setIsStale] = useState(false);
  const { t } = useTranslation();
  const { roomsInfo, params, roomRequestParams, channelId } = useContext(BookingDataContext);
  const { setParams, loadRoomsInfo } = useContext(BookingActionsContext);

  const prevParamsRef = useRef(params);
  useEffect(() => {
    prevParamsRef.current = params;
  });
  const prevParams = prevParamsRef.current;

  const {
    ratesOccupancyPerRoom = DEFAULT_OCCUPANCY_PER_ROOM,
    currency,
    checkinDate = null,
    checkoutDate = null,
    adults,
    children,
  } = params;
  const { data: roomsData, isLoading } = roomsInfo;
  const isReloadDisabled = !moment(checkinDate).isValid() || !moment(checkoutDate).isValid();

  const setRatesOccupancyPerRoom = useCallback(
    (updatedOccupancy) => {
      setParams({ ...params, ratesOccupancyPerRoom: updatedOccupancy });
    },
    [params, setParams],
  );

  const handleReload = useCallback(() => {
    loadRoomsInfo(channelId, params);
  }, [channelId, params, loadRoomsInfo]);

  useEffect(
    function handleSearchParamsChange() {
      const isCheckinDateChanged = params.checkinDate !== prevParams.checkinDate;
      const isCheckoutDateChanged = params.checkoutDate !== prevParams.checkoutDate;
      const isOccupancyChanged =
        params.adults !== prevParams.adults ||
        params.children !== prevParams.children ||
        params.childrenAge !== prevParams.childrenAge;
      const isDatesChaged = isCheckinDateChanged || isCheckoutDateChanged;

      const isCheckinDateMatchesLast = moment(roomRequestParams.checkinDate).isSame(
        params.checkinDate,
        "day",
      );
      const isCheckoutDateMatchesLast = moment(roomRequestParams.checkoutDate).isSame(
        params.checkoutDate,
        "day",
      );
      const isDatesMatchLastRequest =
        isCheckinDateMatchesLast && isCheckoutDateMatchesLast && isOccupancyChanged;

      const isOccupancyMatchLastRequest =
        roomRequestParams.adults === params.adults &&
        roomRequestParams.children === params.children &&
        roomRequestParams.childrenAge === params.childrenAge;

      if (isStale && isDatesMatchLastRequest && isOccupancyMatchLastRequest) {
        setIsStale(false);
        return;
      }

      if (isDatesChaged || isOccupancyChanged) {
        setIsStale(true);
        setParams({ ...params, ratesOccupancyPerRoom: {} });
      }
    },
    [isStale, params, prevParams, roomRequestParams, setParams],
  );

  useEffect(
    function handleRoomsInfoUpdate() {
      setIsStale(false);
    },
    [roomsInfo],
  );

  if (!Array.isArray(roomsData)) {
    return null;
  }

  return (
    <LoadingContainer loading={isLoading}>
      <ReloadContainer disabled={isReloadDisabled} active={isStale} onRefresh={handleReload}>
        <div className={styles.tableContainer}>
          <RatesTableHeader
            propertyRooms={roomsData}
            checkinDate={checkinDate}
            checkoutDate={checkoutDate}
          />
          {roomsData.length ? (
            roomsData.map((roomType, rowIndex) => (
              <RoomType
                disabled={isStale}
                roomType={roomType}
                currency={currency}
                rowIndex={rowIndex}
                checkinDate={checkinDate}
                adultsOccupancy={adults}
                childrenOccupancy={children}
                key={roomType.id}
                ratesOccupancyPerRoom={ratesOccupancyPerRoom}
                onRatesOccupancyChange={setRatesOccupancyPerRoom}
              />
            ))
          ) : (
            <Placeholder
              icon={<FrownOutlined />}
              text={t("rates_table:no_available_rates_placeholder")}
            />
          )}
        </div>
      </ReloadContainer>
    </LoadingContainer>
  );
}
