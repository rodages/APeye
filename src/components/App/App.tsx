import "../../../node_modules/@codat/orchard-ui/dist/index.css";
import "../../index.css";

import { OrchardProvider } from "@codat/orchard-ui";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import styles from "./App.module.scss";
import AppRouter from "./AppRouter";

const App: React.FC = () => (
  <div className={styles.app}>
    <OrchardProvider appId="template-app">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </OrchardProvider>
  </div>
);

export default App;
