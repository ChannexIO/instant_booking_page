import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ConfirmationPage from "pages/confirmation_page";
import HotelPage from "pages/hotel_page";
import NotFoundPage from "pages/not_found_page";
import PaymentPage from "pages/payment_page";

import routes from "./routes";

export default function Routing() {
  return (
    <Switch>
      <Route path={routes.hotelPage} exact>
        <HotelPage />
      </Route>
      <Route path={routes.paymentPage} exact>
        <PaymentPage />
      </Route>
      <Route path={routes.confirmationPage} exact>
        <ConfirmationPage />
      </Route>
      <Route path={routes.default} exact>
        <NotFoundPage />
      </Route>
      <Route path="*">
        <Redirect to={routes.default} />
      </Route>
    </Switch>
  );
}
