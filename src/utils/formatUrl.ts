import { compile } from "path-to-regexp";
import queryString from "query-string";

export type AllowedParamTypes = { [key: string]: string | number | undefined };

export type AllowedQueryTypes = {
  [key: string]: string | number | boolean | undefined;
};

export default function formatUrl<
  ParamType extends AllowedParamTypes = never,
  QueryTypes extends AllowedQueryTypes = never
>(path: string, params?: ParamType, query?: QueryTypes): string {
  const encodedQueryString = query ? `?${queryString.stringify(query)}` : "";
  return compile(path)(params) + encodedQueryString;
}
