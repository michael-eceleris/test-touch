import { serviceAxios } from "../service-axios";
import { serviceRoutes } from "../service-routes";

export const sendCode = (data) => {
  const url = serviceRoutes.code.send();
  return serviceAxios.post(url, data);
};
