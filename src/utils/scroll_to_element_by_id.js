export default (elementId) => {
  const elementToShow = document.getElementById(elementId);

  if (!elementToShow) {
    return;
  }

  elementToShow.scrollIntoView({ behavior: "smooth" });
};
