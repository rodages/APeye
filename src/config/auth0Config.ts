import { CodatAuthWrapperProps } from "@codat/client-cookie-manager";

import config from "config";

const auth0Config: CodatAuthWrapperProps["auth0Config"] = {
  domain: config.AUTH0_DOMAIN,
  clientId: config.AUTH0_CLIENTID,
  cacheLocation: "localstorage",
  authorizationParams: {
    audience: "codat-services",
    redirect_uri: window.location.origin,
    scope: "access:codatservice",
  },
};

export default auth0Config;
