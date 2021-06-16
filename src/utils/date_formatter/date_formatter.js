import moment from "moment";

import { DATE_API_FORMAT, DATE_FORMAT, DATE_UI_FORMAT, DATE_UI_FULL_MONTH_FORMAT } from "constants/formats";

const formatDate = (format) => (date) => {
  return date && moment(date).isValid() ? moment(date).format(format) : null;
};

export default {
  toClient: formatDate(DATE_FORMAT),
  toApi: formatDate(DATE_API_FORMAT),
  toUi: formatDate(DATE_UI_FORMAT),
  toUiFullMonth: formatDate(DATE_UI_FULL_MONTH_FORMAT),
};
