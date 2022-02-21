import { useMutation } from "react-query";
import { sendCode } from "./send-code-service";
import { validCode } from "./send-code-service";

export const usePostSendCode = () => {
  return useMutation((data) => sendCode(data).then((res) => res.data));
};

export const useValidCode = () => {
  return useMutation((data) => validCode(data).then((res) => res));
};
