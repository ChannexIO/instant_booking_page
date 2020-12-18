import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import LinkButton from 'components/buttons/link_button';

import { BookingActionsContext } from 'containers/data_context';

import routes from 'routing/routes';

import buildPath from 'utils/build_path';

export default function NewBookingLink({ channelId }) {
  const { resetParams, clearDataFromStorage } = useContext(BookingActionsContext);
  const history = useHistory();
  const { t } = useTranslation();

  const redirectPath = buildPath('', routes.hotelPage, { channelId });

  const handleRedirect = () => {
    resetParams();
    clearDataFromStorage();
    history.push(redirectPath);
  };

  return (
    <LinkButton onClick={handleRedirect}>
      {t('confirmation_page:create_new_booking')}
    </LinkButton>
  );
}
