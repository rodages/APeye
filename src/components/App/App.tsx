import "../../../node_modules/@codat/orchard-ui/dist/index.css";
import "../../index.css";

import { OrchardProvider, Sidebar } from "@codat/orchard-ui";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import styles from "./App.module.scss";
import AppRouter from "./AppRouter";

const App: React.FC = () => {
  const sidebarGroups = [
    {
      groupName: "Data types",
      items: [
        {
          name: "Supplier",
          route: {
            pathname: "/supplier",
          },
        },
        {
          name: "Bill",
          route: {
            pathname: "/bill",
          },
        },
      ],
    },
  ];
  return (
    <div className={styles.app}>
      <OrchardProvider appId="template-app">
        <BrowserRouter>
          <div className={styles.nav}>
            <Sidebar sidebarGroups={sidebarGroups} />
            <AppRouter />
          </div>
        </BrowserRouter>
      </OrchardProvider>
    </div>
  );
};

export default App;
