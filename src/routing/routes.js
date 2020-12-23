const composeRoute = (route) => {
  const path = process.env.REACT_APP_BASE_PATH;

  return `${path}${route}`;
};

const routes = {
  hotelPage: composeRoute('/:channelId'),
  paymentPage: composeRoute('/:channelId/payment_page'),
  confirmationPage: composeRoute('/:channelId/confirmation/:bookingId'),
  default: composeRoute('/hotel_not_found/404'),
};

export default routes;
