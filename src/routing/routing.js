import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import HotelPage from "pages/hotel_page";

export default function Routing(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:hotel_id" exact>
          <HotelPage {...props} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}