import React from "react";
import { useTranslation } from "react-i18next";
import { DeleteOutlined } from "@ant-design/icons";

import LinkButton from "components/buttons/link_button";
import FormalField from "components/inputs/formal_field";
import Input from "components/inputs/input";
import FieldRow from "components/layout/field_row";

import styles from "./guest.module.css";

const TRANSLATION_PATH = "payment_page:payment_form:guest_info";

export default function Guest({ index, readOnly, isDeleteEnabled, onDelete }) {
  const { t } = useTranslation();

  const handleDeleteClick = () => {
    onDelete(index);
  };

  return (
    <FieldRow>
      <FormalField
        readOnly={readOnly}
        name={`guest.list.${index}.name`}
        label={t(`${TRANSLATION_PATH}:first_name`)}
        shouldUnregister
        Component={Input}
      />
      <FormalField
        readOnly={readOnly}
        name={`guest.list.${index}.surname`}
        label={t(`${TRANSLATION_PATH}:last_name`)}
        shouldUnregister
        Component={Input}
      />
      <LinkButton className={styles.button} disabled={!isDeleteEnabled} onClick={handleDeleteClick}>
        <DeleteOutlined className={styles.deleteIcon} />
      </LinkButton>
    </FieldRow>
  );
}
