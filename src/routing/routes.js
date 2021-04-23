const composeRoute = (route) => {
  const path = process.env.REACT_APP_BASE_PATH;

  return `${path}${route}`;
};

const routes = {
  homePage: composeRoute("/"),
  searchPage: composeRoute("/search"),
  hotelPage: composeRoute("/hotel/:channelId"),
  paymentPage: composeRoute("/hotel/:channelId/payment_page"),
  confirmationPage: composeRoute("/hotel/:channelId/confirmation/:bookingId"),
  unActiveSearchPage: composeRoute("/un_active_search"),
  default: composeRoute("/404"),
};

export default routes;
