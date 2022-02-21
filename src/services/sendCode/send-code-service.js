import { serviceAxios } from "../service-axios";
import { serviceRoutes } from "../service-routes";

export const sendCode = (data) => {
  const url = serviceRoutes.code.send();
  return serviceAxios.post(url, data);
};

export const validCode = (data) => {
  const url = serviceRoutes.code.valid();
  return serviceAxios.post(url, data);
};
