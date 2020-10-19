const extractAttributes = (payload) => {
  const { attributes, ...rest } = payload;

  return { ...rest, ...attributes };
};

const attributesExtractor = (payload) => {
  if (!Array.isArray(payload)) {
    return extractAttributes(payload);
  }

  return payload.map(attributesExtractor);
};

export default attributesExtractor;
