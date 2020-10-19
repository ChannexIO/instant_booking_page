export default () => {
  const searchString = decodeURIComponent(window.location.search.substr(1));
  const searchParams = searchString.split('&');

  return searchParams.reduce((acc, param) => {
    const [name, value = true] = param.split('=');

    return { ...acc, [name]: value };
  }, {});
};
