import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import HotelPage from 'pages/hotel_page';

export default function Routing() {
  const path = process.env.REACT_APP_BASE_PATH;

  return (
    <Switch>
      <Route path={`${path}/:channelId`} exact>
      {/* <Route path="/:"> */}
        <HotelPage />
      </Route>
      <Route path="*">
        404
      </Route>
    </Switch>
  );
}
