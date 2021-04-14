import React, { useCallback, useContext } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";

import { BookingDataContext } from "containers/data_context";

import routes from "routing/routes";

export default function HeadManager() {
  const { t } = useTranslation();

  const { property } = useContext(BookingDataContext);
  const { data } = property;

  const isSearchPage = !!useRouteMatch(routes.searchPage);
  const isHotelPage = !!useRouteMatch(routes.hotelPage);
  const isPaymentPage = !!useRouteMatch(routes.paymentPage);
  const isConfirmationPage = !!useRouteMatch(routes.confirmationPage);
  const isDefaultPage = !!useRouteMatch(routes.default);

  const getDocTitle = useCallback(() => {
    if (isSearchPage) {
      return t("global:search_page_doc_title");
    }

    if (isHotelPage || isPaymentPage || isConfirmationPage) {
      return data?.title ?? t("global:loading");
    }
    if (isDefaultPage) {
      return "404";
    }

    return t("global:main_page_doc_title");
  }, [data, t, isConfirmationPage, isDefaultPage, isHotelPage, isPaymentPage, isSearchPage]);

  const docTitle = getDocTitle();

  return (
    <Helmet>
      <title>{docTitle}</title>
    </Helmet>
  );
}
