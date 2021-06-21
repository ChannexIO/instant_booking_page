import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import FormalField from "components/inputs/formal_field";
import Input from "components/inputs/input";
import TextArea from "components/inputs/text_area";
import FieldRow from "components/layout/field_row";
import Panel from "components/layout/panel";

import errors from "constants/errors";

const TRANSLATION_PATH = "payment_page:payment_form:customer_info";

//  eslint-disable-next-line
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const MAX_PHONE_LENGTH = 15;

export const getSchema = () =>
  yup.object({
    name: yup.string().trim().required(errors.required()),
    surname: yup.string().trim().required(errors.required()),
    mail: yup.string().email(errors.email()).required(errors.required()),
    phone: yup
      .string()
      .matches(phoneRegExp, errors.phone())
      .max(MAX_PHONE_LENGTH, errors.phone())
      .required(errors.required()),
    specialRequest: yup.string(),
  });

export function CustomerInfo() {
  const { t } = useTranslation();

  return (
    <Panel title={t(`${TRANSLATION_PATH}:title`)}>
      <FieldRow>
        <FormalField
          name="customer.name"
          label={t(`${TRANSLATION_PATH}:first_name`)}
          Component={Input}
        />
        <FormalField
          name="customer.surname"
          label={t(`${TRANSLATION_PATH}:last_name`)}
          Component={Input}
        />
      </FieldRow>
      <FieldRow>
        <FormalField
          name="customer.mail"
          label={t(`${TRANSLATION_PATH}:email`)}
          Component={Input}
        />
        <FormalField
          name="customer.phone"
          type="number"
          label={t(`${TRANSLATION_PATH}:phone`)}
          Component={Input}
        />
      </FieldRow>
      <FieldRow>
        <FormalField
          name="customer.specialRequest"
          label={t(`${TRANSLATION_PATH}:special_request`)}
          rows={3}
          Component={TextArea}
        />
      </FieldRow>
    </Panel>
  );
}
