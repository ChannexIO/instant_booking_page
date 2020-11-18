export default (history, route, params) => {
  const { search } = history.location;

  const updatedRoute = route.replace(/(:[\w]+)/g, (match) => {
    const paramName = match.substr(1);
    const matchedParam = params[paramName];

    if (matchedParam === undefined) {
      console.error(`Missing query parameter - ${paramName}`);
    }

    return matchedParam;
  });

  return `${updatedRoute}${search}`;
}