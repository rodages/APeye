import { CypressConfigBuilder } from "@codat/boilerplate-tools";
import { defineConfig } from "cypress";

export default defineConfig(
  CypressConfigBuilder({
    baseUrl: "https://ui-local.codat.io/",
    enableComponentTests: true,
    useReactRefreshPlugin: true,
  })
);
