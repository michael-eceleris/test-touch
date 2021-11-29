const getResolution = () => {
  if (window.screen.availWidth > 465) {
    return false;
  } else {
    return true;
  }
};

const getTypePhone = () => {
  const phone = window.navigator.userAgent;
  return phone;
};

export const useMobile = () => {
  const isMobile = getResolution();
  const typeMobile = getTypePhone();
  const isIphone = getTypePhone().includes("iPhone");
  return { isMobile, typeMobile, isIphone };
};
