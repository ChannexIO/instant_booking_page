const getOpenDirection = (ref, directions) => {
  const elCoords = ref.current.getBoundingClientRect();
  const isCloserToTop = elCoords.y < window.innerHeight / 2;

  const [up, down] = directions;

  return isCloserToTop ? down : up;
};

export default getOpenDirection;
