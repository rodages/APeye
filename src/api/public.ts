/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import formatUrl from "utils/formatUrl";

import api from "config/urls/api";

import { usePublicApi } from "./setup";
import { ApiError } from "./shared";

export type ClientType =
  | "Unknown"
  | "ClientFreeTrial"
  | "ClientStartUp"
  | "ClientTest"
  | "ClientProspect"
  | "ClientProd"
  | "CodatInternal"
  | "CodatSalesDemo"
  | "CodatQATest";

export interface UserState {
  id: string;
  clientName: string;
  userName: string;
  userId: string;
  isPartner: boolean;
  allowPreview: boolean;
  userPermissions: string[];
  freeAccount?: boolean;
  expiry?: string;
  companyLimit?: number;
  dataIntegrityEnabled: boolean;
  hourlySyncAllowed: boolean;
  portalLogo?: string;
  clientType?: ClientType;
}

export const useGetUserStateQuery = () => {
  return usePublicApi<UserState, ApiError>({
    url: formatUrl(api.auth.userstate, {}),
  });
};
