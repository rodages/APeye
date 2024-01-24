import { WebpackConfigurationBuilder } from "@codat/boilerplate-tools/webpack";

export default {
  ...WebpackConfigurationBuilder({
    modulesExposes: {
      defaultExposedAppName: "src/components/App",
    },
    useCspHtmlPlugin: true,
    useReactRefreshPlugin: true,
    runAsWebApp: true,
  }),
};
