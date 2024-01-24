import { CodatOidcConfig } from "@codat/client-cookie-manager";

import config from "config";

const oidcConfig: CodatOidcConfig = {
  authority: config.IDENTITY_SERVER_URL,
  clientId: "TemplateApp",
  redirectUri: window.location.origin,
  scope: "openid",
  responseType: "id_token token",
  autoSignIn: false,
  requireClientCookie: false,
};

export default oidcConfig;
