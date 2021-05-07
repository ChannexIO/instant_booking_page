import { matchPath } from "react-router-dom";

import routes from "routing/routes";

const getChannelId = () => {
  const matchedPath = matchPath(window.location.pathname, { path: routes.hotelPage });

  if (!matchedPath) {
    return null;
  }

  return matchedPath.params.channelId;
};

export default getChannelId;
