import { AxiosError as ExistingAxiosError } from "axios";

declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface AxiosError<T = any> extends ExistingAxiosError<T> {
    isAuthError?: boolean;
  }
}
