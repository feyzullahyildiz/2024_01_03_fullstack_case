import { isAxiosError } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resolveAxiosError = (error: any) => {
  if (isAxiosError(error)) {
    return error.response?.data || error;
  }
  return error;
};
