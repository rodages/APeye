import { useCodatAuth } from "@codat/client-cookie-manager";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Options, UseAxios, UseAxiosResult } from "axios-hooks";
import queryString from "query-string";

import config from "config";
import { api } from "config/urls";

import { UserState } from "./public";
import { ApiError } from "./shared";

const clientSelectUrl = `${config.IDENTITY_SERVER_URL}/select`;

export const useApiRequest = <TResponse, TError extends ApiError>(
  useAxios: UseAxios,
  serviceName: string,
  requestConfig: AxiosRequestConfig | string,
  options?: Options
): UseAxiosResult<TResponse, TError> => {
  const auth = useCodatAuth();

  const token = auth.userData?.access_token;

  const resolvedConfig: AxiosRequestConfig =
    typeof requestConfig === "object"
      ? {
          ...requestConfig,
          headers: {
            ...(requestConfig.headers || {}),
            authorization: token ? `Bearer ${token}` : "",
          },
        }
      : {
          url: requestConfig,
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        };

  const result = useAxios<TResponse, TError>(resolvedConfig, options);

  const error = result[0].error;
  const data = error?.response?.data;
  const service = data?.service;

  if (error && data && service === serviceName) {
    const { statusCode } = data;

    if (statusCode === 401) {
      error.isAuthError = true;
      auth.signIn();
    }

    if (statusCode === 402 && data.error === "Payment Required") {
      error.isAuthError = true;
      auth.selectClient();
    }

    if (statusCode === 403) {
      error.isAuthError = true;
      auth.selectClient();
    }
  }

  return result;
};

export const handleAuthStateResponse = (response: AxiosResponse): void => {
  if (response.config.url === api.auth.userstate) {
    const userState: UserState = response.data;
    if (userState.id === "00000000-0000-0000-0000-000000000000") {
      redirect(clientSelectUrl);
    }
  }
};

const redirect = (url: string, state?: string) => {
  window.location.assign(
    `${url}?${queryString.stringify({
      redirectUrl: window.location.href,
      state,
    })}`
  );
};
