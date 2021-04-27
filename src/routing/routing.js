import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import ConfirmationPage from "pages/confirmation_page";
import HomePage from "pages/home_page";
import HotelPage from "pages/hotel_page";
import NotFoundPage from "pages/not_found_page";
import PaymentPage from "pages/payment_page";
import SearchPage from "pages/search_page";

import buildPath from "utils/build_path";
import getUrlParams from "utils/get_url_params";

import routes from "./routes";

export default function Routing() {
  const history = useHistory();

  useEffect(
    function handleChannelRedirect() {
      const { channel } = getUrlParams();

      if (!channel) {
        return;
      }

      const hotelUrl = buildPath("", routes.hotelPage, { channelId: channel });

      history.replace(hotelUrl);
    },
    [history],
  );

  return (
    <Switch>
      <Route path={routes.default} exact>
        <NotFoundPage />
      </Route>
      <Route path={routes.homePage} exact>
        <HomePage />
      </Route>
      <Route path={routes.searchPage} exact>
        <SearchPage />
      </Route>
      <Route path={routes.hotelPage} exact>
        <HotelPage />
      </Route>
      <Route path={routes.paymentPage} exact>
        <PaymentPage />
      </Route>
      <Route path={routes.confirmationPage} exact>
        <ConfirmationPage />
      </Route>

      <Route path="*">
        <Redirect to={routes.default} />
      </Route>
    </Switch>
  );
}
