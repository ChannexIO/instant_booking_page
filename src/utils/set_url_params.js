export default (params, history) => {
  const originalUrl = new URL(window.location.href);
  const updatedUrl = new URL(window.location.href);
  updatedUrl.search = "";

  originalUrl.searchParams.forEach((value, key) => {
    updatedUrl.searchParams.set(key, value);
  });

  Object.entries(params).forEach(([key, value]) => {
    updatedUrl.searchParams.set(key, value);
  });

  history.push(`${updatedUrl.pathname}${updatedUrl.search}`);
};
