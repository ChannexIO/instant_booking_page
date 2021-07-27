const validateCoordsArray = (coords) => {
  const allCoordsPresent = coords.length === 4;
  const allCoordsValid = !coords.includes(NaN);

  return allCoordsPresent && allCoordsValid;
};

const buildCoordsObject = (coords) => ({
  latitude: {
    lte: coords[0],
    gte: coords[1],
  },
  longitude: {
    lte: coords[2],
    gte: coords[3],
  },
});

export const decodeMapParams = (mapParams = "") => {
  const coords = mapParams.split(",").map(Number);

  const isCoordsValid = validateCoordsArray(coords);

  if (!isCoordsValid) {
    return null;
  }

  return buildCoordsObject(coords);
};

export const encodeMapParams = (mapParams) => {
  if (!mapParams?.latitude || !mapParams?.longitude) {
    return null;
  }

  return [
    mapParams.latitude.lte,
    mapParams.latitude.gte,
    mapParams.longitude.lte,
    mapParams.longitude.gte,
  ].join(",");
};
