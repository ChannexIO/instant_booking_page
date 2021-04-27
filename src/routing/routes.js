const composeRoute = (route) => {
  const { REACT_APP_BASE_PATH: basePath = "" } = process.env;

  return `${basePath}${route}`;
};

const routes = {
  homePage: composeRoute("/"),
  searchPage: composeRoute("/search"),
  hotelPage: composeRoute("/:channelId"),
  paymentPage: composeRoute("/:channelId/payment_page"),
  confirmationPage: composeRoute("/:channelId/confirmation/:bookingId"),
  default: composeRoute("/404"),
};

export default routes;
