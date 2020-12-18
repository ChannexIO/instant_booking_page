import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import csc from 'country-state-city';
import * as yup from 'yup';

import FormalField from 'components/inputs/formal_field';
import Input from 'components/inputs/input';
import MaterialSelect from 'components/inputs/material_select';
import FieldRow from 'components/layout/field_row';
import Panel from 'components/layout/panel';

const TRANSLATION_PATH = 'payment_page:payment_form:billing_address';

export const getSchema = () => (
  yup.object({
    address: yup.string(),
    additionalAddress: yup.string(),
    country: yup.string(),
    city: yup.string(),
    state: yup.string(),
    zip: yup.string(),
  })
);

export function BillingAddress() {
  const { t } = useTranslation();
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(function initCountryOptions() {
    const newCountryOptions = csc.getAllCountries()
      .map((countryOption) => ({
        key: countryOption.sortname,
        value: countryOption.name,
      }));

    setCountryOptions(newCountryOptions);
  }, [setCountryOptions]);

  return (
    <Panel title={t(`${TRANSLATION_PATH}:title`)}>
      <FieldRow>
        <FormalField
          name="billingAddress.address"
          label={t(`${TRANSLATION_PATH}:address_1`)}
          as={Input}
        />
        <FormalField
          name="billingAddress.additionalAddress"
          label={t(`${TRANSLATION_PATH}:address_2`)}
          as={Input}
        />
      </FieldRow>
      <FieldRow>
        <FormalField
          withSearch
          name="billingAddress.country"
          options={countryOptions}
          label={t(`${TRANSLATION_PATH}:country`)}
          as={MaterialSelect}
        />
        <FormalField
          name="billingAddress.city"
          label={t(`${TRANSLATION_PATH}:city`)}
          as={Input}
        />
        <FormalField
          name="billingAddress.state"
          label={t(`${TRANSLATION_PATH}:state`)}
          as={Input}
        />
        <FormalField
          name="billingAddress.zip"
          label={t(`${TRANSLATION_PATH}:zip`)}
          as={Input}
        />
      </FieldRow>
    </Panel>
  );
}
