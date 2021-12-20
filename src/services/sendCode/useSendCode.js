import { useMutation } from "react-query";
import { sendCode } from "./send-code-service";

export const usePostSendCode = () => {
  return useMutation((data) => sendCode(data).then((res) => res.data));
};
