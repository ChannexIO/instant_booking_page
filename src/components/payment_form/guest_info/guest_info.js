import React, { useCallback, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import LinkButton from "components/buttons/link_button";
import Checkbox from "components/inputs/checkbox";
import FormalField from "components/inputs/formal_field";
import Panel from "components/layout/panel";

import errors from "constants/errors";

import Guest from "./guest";

const TRANSLATION_PATH = "payment_page:payment_form:guest_info";

export const getSchema = () =>
  yup.object({
    useCustomerValues: yup.boolean(),
    list: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().trim().required(errors.required),
          surname: yup.string().trim().required(errors.required),
        }),
      )
      .when(["useCustomerValues"], {
        is: false,
        then: yup.array().min(1),
        otherwise: yup.array().nullable(),
      }),
  });

export function GuestInfo({ maxGuests }) {
  const { t } = useTranslation();
  const { setValue } = useFormContext();
  const useCustomerValue = useWatch({ name: "guest.useCustomerValue", defaultValue: false });
  const customerName = useWatch({ name: "customer.name", defaultValue: "" });
  const customerSurame = useWatch({ name: "customer.surname", defaultValue: "" });

  const guestList = useWatch({ name: "guest.list", defaultValue: [] });
  const [guestKeysList, setGuestKeysList] = useState([Date.now()]);
  const isGuestCouldBeAdded = guestKeysList.length !== maxGuests;

  const handleAddGuest = useCallback(() => {
    const updatedGuestList = [...guestKeysList, Date.now()];

    setGuestKeysList(updatedGuestList);
  }, [guestKeysList]);

  const handleDeleteGuest = useCallback(
    (guestIndex) => {
      const updatedGuestList = [
        ...guestKeysList.slice(0, guestIndex),
        ...guestKeysList.slice(guestIndex + 1),
      ];

      const updatedGuestListValue = [
        ...guestList.slice(0, guestIndex),
        ...guestList.slice(guestIndex + 1),
      ];

      setValue("guest.list", updatedGuestListValue);
      setGuestKeysList(updatedGuestList);
    },
    [guestKeysList, guestList, setValue],
  );

  useEffect(
    function handleInfoSourceChange() {
      if (useCustomerValue) {
        setValue("guest.list[0].name", customerName);
        setValue("guest.list[0].surname", customerSurame);
      }
    },
    [customerName, customerSurame, setValue, useCustomerValue],
  );

  const [firstGuestKey, ...restGuests] = guestKeysList;

  return (
    <Panel
      title={t(`${TRANSLATION_PATH}:title`)}
      addOn={
        <FormalField
          name="guest.useCustomerValue"
          defaultValue
          label={t(`${TRANSLATION_PATH}:use_customer`)}
          as={Checkbox}
        />
      }
    >
      <Guest
        guestKey={firstGuestKey}
        index={0}
        disabled={useCustomerValue}
        isDeleteEnabled={false}
        onDelete={handleDeleteGuest}
      />
      {!useCustomerValue && (
        <>
          {restGuests.map((key, index) => (
            <Guest
              key={key}
              guestKey={key}
              index={index + 1}
              isDeleteEnabled
              onDelete={handleDeleteGuest}
            />
          ))}
          {isGuestCouldBeAdded && (
            <LinkButton onClick={handleAddGuest}>{t(`${TRANSLATION_PATH}:add_guest`)}</LinkButton>
          )}
        </>
      )}
    </Panel>
  );
}
