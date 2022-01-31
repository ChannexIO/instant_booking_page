import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import csc from "country-state-city";
import * as yup from "yup";

import FormalField from "components/inputs/formal_field";
import Input from "components/inputs/input";
import MaterialSelect from "components/inputs/material_select";
import FieldRow from "components/layout/field_row";
import Panel from "components/layout/panel";

import errors from "constants/errors";

const TRANSLATION_PATH = "payment_page:payment_form:billing_address";

export const getSchema = () =>
  yup.object({
    address: yup
      .string()
      .when("$billingAddressIsRequired", (isRequired, schema) =>
        isRequired ? schema.required(errors.required()) : schema,
      ),
    additionalAddress: yup.string(),
    country: yup
      .string()
      .when("$billingAddressIsRequired", (isRequired, schema) =>
        isRequired ? schema.required(errors.required()) : schema,
      ),
    city: yup
      .string()
      .when("$billingAddressIsRequired", (isRequired, schema) =>
        isRequired ? schema.required(errors.required()) : schema,
      ),
    state: yup
      .string()
      .when("$billingAddressIsRequired", (isRequired, schema) =>
        isRequired ? schema.required(errors.required()) : schema,
      ),
    zip: yup
      .string()
      .when("$billingAddressIsRequired", (isRequired, schema) =>
        isRequired ? schema.required(errors.required()) : schema,
      ),
  });

export function BillingAddress() {
  const { t } = useTranslation();
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(
    function initCountryOptions() {
      const newCountryOptions = csc.getAllCountries().map((countryOption) => ({
        key: countryOption.sortname,
        value: countryOption.name,
      }));

      setCountryOptions(newCountryOptions);
    },
    [setCountryOptions],
  );

  return (
    <Panel title={t(`${TRANSLATION_PATH}:title`)}>
      <FieldRow>
        <FormalField
          name="billingAddress.address"
          label={t(`${TRANSLATION_PATH}:address_1`)}
          Component={Input}
        />
        <FormalField
          name="billingAddress.additionalAddress"
          label={t(`${TRANSLATION_PATH}:address_2`)}
          Component={Input}
        />
      </FieldRow>
      <FieldRow>
        <FormalField
          withSearch
          name="billingAddress.country"
          options={countryOptions}
          label={t(`${TRANSLATION_PATH}:country`)}
          Component={MaterialSelect}
        />
        <FormalField
          name="billingAddress.city"
          label={t(`${TRANSLATION_PATH}:city`)}
          Component={Input}
        />
        <FormalField
          name="billingAddress.state"
          label={t(`${TRANSLATION_PATH}:state`)}
          Component={Input}
        />
        <FormalField
          name="billingAddress.zip"
          label={t(`${TRANSLATION_PATH}:zip`)}
          Component={Input}
        />
      </FieldRow>
    </Panel>
  );
}
