import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import LinkButton from "components/buttons/link_button";
import PolicyLink from "components/policy_link";

import PolicyInfoModal from "./policy_info_modal";

export default function PolicyInfo() {
  const { t } = useTranslation();
  const [isModalShown, setIsModalShown] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalShown(!isModalShown);
  }, [isModalShown]);

  return (
    <>
      <LinkButton onClick={toggleModal}>{t("payment_page:booking_policy")},</LinkButton>
      <PolicyLink />
      <PolicyInfoModal show={isModalShown} onHide={toggleModal} />
    </>
  );
}
