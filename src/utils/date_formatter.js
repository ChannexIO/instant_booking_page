import moment from 'moment';

import { DATE_API_FORMAT, DATE_FORMAT } from 'constants/formats';

const formatDate = (format) => (date) => {
  return moment(date).isValid() ? moment(date).format(format) : null;
};

export default {
  toClient: formatDate(DATE_FORMAT),
  toApi: formatDate(DATE_API_FORMAT),
};
