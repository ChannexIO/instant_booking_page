import { setToStorage, getFromStorage, removeFromStorage } from "containers/data_context/utils/session_storage_manager";
import moment from 'moment';
import { BOOKING_PARAMS } from "constants/storage_keys";

export function getSavedState() {
  const savedState = getFromStorage(BOOKING_PARAMS)

  if (!savedState) {
    return null;
  }

  const { params = {}, ...rest } = savedState;

  const updatedParams = {
    ...params,
    checkinDate:  moment(params.checkinDate),
    checkoutDate: moment(params.checkoutDate),
  };

  return { ...rest, params: updatedParams };
}

export function setSavedState(state) {
  setToStorage(BOOKING_PARAMS, state);
} 

export function clearSavedState() {
  removeFromStorage(BOOKING_PARAMS);
}