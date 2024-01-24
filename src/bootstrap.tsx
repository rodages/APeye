// Use this file for any setup (providers, styles, etc) that you
// don't want to be included in a micro-frontend build

import { AnalyticsProvider } from "@codat/analytics";
import { CodatAuthProvider } from "@codat/client-cookie-manager";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { MockAuthProvider } from "testUtils";

import App from "components/App";
import config from "config";
import auth0Config from "config/auth0Config";
import oidcConfig from "config/oidcConfig";

// This can be removed if your app doesn't require authentication
const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return window.origin.match("localhost") ? (
    <MockAuthProvider>{children}</MockAuthProvider>
  ) : (
    <CodatAuthProvider
      clientCookieKey={config.APP_CLIENT_COOKIE_NAME}
      userManagementUrl={config.USER_MANAGEMENT_URL}
      oidcConfig={oidcConfig}
      auth0Config={auth0Config}
    >
      {children}
    </CodatAuthProvider>
  );
};

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <AuthProvider>
    <React.StrictMode>
      <AnalyticsProvider
        config={{
          appName: "Template App", // Replace this with the name of your app,
          apiKey: config.AMPLITUDE_API_KEY,
          mode:
            config.ENVIRONMENT === "Integration" ? "development" : "production",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "3.5rem",
          }}
        >
          <App />
        </div>
      </AnalyticsProvider>
    </React.StrictMode>
  </AuthProvider>
);
