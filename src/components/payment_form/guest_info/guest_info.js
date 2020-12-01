import React from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import FormalField from 'components/inputs/formal_field';
import Input from 'components/inputs/input';
import FieldRow from 'components/layout/field_row';
import Panel from 'components/layout/panel';

import errors from 'constants/errors';

const TRANSLATION_PATH = 'payment_page:payment_form:guest_info';

export const getSchema = () => (
  yup.object({
    firstName: yup.string().trim().required(errors.required),
    lastName: yup.string().trim().required(errors.required),
  })
);

export function GuestInfo() {
  const { t } = useTranslation();

  return (
    <Panel title={t(`${TRANSLATION_PATH}:title`)}>
      <FieldRow>
        <FormalField
          name="guest.firstName"
          label={t(`${TRANSLATION_PATH}:first_name`)}
          as={Input}
        />
        <FormalField
          name="guest.lastName"
          label={t(`${TRANSLATION_PATH}:last_name`)}
          as={Input}
        />
      </FieldRow>
    </Panel>
  );
}
