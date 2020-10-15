import moment from 'moment';

import { DATE_FORMAT, DATE_API_FORMAT } from 'constants/formats';

const formatDate = (format) => (date) => {
  return date ? moment(date).format(format) : null;
};

export default {
  toClient: formatDate(DATE_FORMAT),
  toApi: formatDate(DATE_API_FORMAT),
};
