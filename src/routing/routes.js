const composeRoute = (route) => {
  const path = process.env.REACT_APP_BASE_PATH;

  return `${path}${route}`;
};

const routes = {
  hotelPage: composeRoute('/:channelId'),
  paymentPage: composeRoute('/:channelId/payment_page'),
};

export default routes;
