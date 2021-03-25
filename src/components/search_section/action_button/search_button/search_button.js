import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/button";

import { HOTEL_INFO_SECTION } from "constants/element_ids";
import scrollToElementById from "utils/scroll_to_element_by_id";

export default function SearchButton({ loading, disabled, onClick }) {
  const { t } = useTranslation();

  const handleClick = useCallback(async () => {
    await onClick();
    scrollToElementById(HOTEL_INFO_SECTION);
  }, [onClick]);

  return (
    <Button loading={loading} disabled={disabled} onClick={handleClick}>
      {t("hotel_page:search")}
    </Button>
  );
}
