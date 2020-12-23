import React, { useCallback, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import LinkButton from 'components/buttons/link_button';
import Checkbox from 'components/inputs/checkbox';
import FormalField from 'components/inputs/formal_field';
import FieldRow from 'components/layout/field_row';
import Panel from 'components/layout/panel';

import errors from 'constants/errors';

import Guest from './guest';

const TRANSLATION_PATH = 'payment_page:payment_form:guest_info';

export const getSchema = () => (
  yup.object({
    useCustomerValues: yup.boolean(),
    list: yup.array().of(
      yup.object().shape({
        firstName: yup.string().trim().required(errors.required),
        lastName: yup.string().trim().required(errors.required),
      }),
    )
      .when(['useCustomerValues'], {
        is: false,
        then: yup.array().min(1),
        otherwise: yup.array().nullable(),
      }),
  }));

export function GuestInfo({ maxGuests }) {
  const { t } = useTranslation();
  const { setValue } = useFormContext();
  const useCustomerValue = useWatch({ name: 'guest.useCustomerValue', defaultValue: false });
  const guestList = useWatch({ name: 'guest.list', defaultValue: [] });
  const [guestKeysList, setGuestKeysList] = useState([Date.now()]);
  const isGuestCouldBeAdded = guestKeysList.length !== maxGuests;
  const isGuestCouldBeDeleted = guestKeysList.length > 1;

  const handleAddGuest = useCallback(() => {
    const updatedGuestList = [...guestKeysList, Date.now()];

    setGuestKeysList(updatedGuestList);
  }, [guestKeysList]);

  const handleDeleteGuest = useCallback((guestIndex) => {
    const updatedGuestList = [
      ...guestKeysList.slice(0, guestIndex),
      ...guestKeysList.slice(guestIndex + 1),
    ];

    const updatedGuestListValue = [
      ...guestList.slice(0, guestIndex),
      ...guestList.slice(guestIndex + 1),
    ];

    setValue('guest.list', updatedGuestListValue);
    setGuestKeysList(updatedGuestList);
  }, [guestKeysList, guestList, setValue]);

  return (
    <Panel title={t(`${TRANSLATION_PATH}:title`)}>
      <FieldRow>
        <FormalField
          name="guest.useCustomerValue"
          defaultValue
          label={t(`${TRANSLATION_PATH}:use_customer`)}
          as={Checkbox}
        />
      </FieldRow>
      {!useCustomerValue && (
        <>
          {guestKeysList.map((key, index) => (
            <Guest
              key={key}
              guestKey={key}
              index={index}
              isDeleteEnabled={isGuestCouldBeDeleted}
              onDelete={handleDeleteGuest}
            />
          ))}
          <LinkButton
            disabled={!isGuestCouldBeAdded}
            onClick={handleAddGuest}
          >
            {t(`${TRANSLATION_PATH}:add_guest`)}
          </LinkButton>
        </>
      )}
        {/* <ErrorMessage name="guest.list" render={FieldError} /> */}
    </Panel>
  );
}
