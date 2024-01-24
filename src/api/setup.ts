import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Options, UseAxios, makeUseAxios } from "axios-hooks";

import config from "config";

import { useApiRequest } from "./interceptors";
import { ApiError } from "./shared";

interface Api {
  instance: AxiosInstance;
  useAxios: UseAxios;
}

const publicInstance = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/json;charset=UTF-8" },
  baseURL: config.PUBLIC_API_URL,
});

const api = {
  public: {
    instance: publicInstance,
    useAxios: makeUseAxios({
      axios: publicInstance,
      defaultOptions: { useCache: false },
    }),
  } as Api,
};

const makeUseApiRequest =
  (useAxios: UseAxios, serviceName: string) =>
  <TResponse, TError extends ApiError>(
    requestConfig: AxiosRequestConfig | string,
    options?: Options
  ) => {
    return useApiRequest<TResponse, TError>(
      useAxios,
      serviceName,
      requestConfig,
      options
    );
  };

export const usePublicApi = makeUseApiRequest(api.public.useAxios, "PublicApi");

export default api;
