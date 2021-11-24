const getResolution = () => {
  if (window.screen.availWidth > 465) {
    return false;
  } else {
    return true;
  }
};

export const useMobile = () => {
  const isMobile = getResolution();
  return { isMobile };
};
