/**
 * Note: if you will be using this app as a micro frontend within the Portal
 * you will need to rename AppConfig to something else (e.g. `MyAppConfig`)
 * so values aren't overwritten by portal-ui pipeline variables
 */
interface AppConfig {
  ENVIRONMENT: "Integration" | "Staging" | "Production";
  AMPLITUDE_API_KEY: string;
  PUBLIC_API_URL: string;
  IDENTITY_SERVER_URL: string;
  USER_MANAGEMENT_URL: string;
  APP_CLIENT_COOKIE_NAME: string;
  AUTH0_CLIENTID: string;
  AUTH0_DOMAIN: string;
}

interface ConfigWindow extends Window {
  AppConfig: AppConfig;
}

declare let window: ConfigWindow;

const config: AppConfig = window.AppConfig || {
  ENVIRONMENT: "Integration",
  AMPLITUDE_API_KEY: "",
  PUBLIC_API_URL: "https://api-integration.codat.io",
  IDENTITY_SERVER_URL: "https://identity-integration.codat.io",
  USER_MANAGEMENT_URL: "https://users-integration.codat.io",
  APP_CLIENT_COOKIE_NAME: "", // Update this with the name of your app
  AUTH0_CLIENTID: "ZI6Rwgk2imDGDZ82PCQkLHJrZitJODOr",
  AUTH0_DOMAIN: "authentication-integration.codat.io",
};

export default config;
