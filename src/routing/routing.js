import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HotelPage from 'pages/hotel_page';

export default function Routing() {
  return (
    <Switch>
      <Route path="/:channelId" exact>
      {/* <Route path="/:"> */}
        <HotelPage />
      </Route>
    </Switch>
  );
}