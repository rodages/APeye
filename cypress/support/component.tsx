// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "@cypress/code-coverage/support";

import "../../node_modules/@codat/orchard-ui/dist/index.css";
import "../../src/index.css";
import "./commands";

import { AnalyticsContext } from "@codat/analytics";
import { OrchardProvider } from "@codat/orchard-ui";
import { mount } from "cypress/react18";
import React from "react";

const mountWithWrappers = (elem: React.ReactNode) =>
  cy.mount(
    <OrchardProvider appId="test-portal">
      {/* 
        You can use these spies to check events have been raised correctly.
        e.g. 
          cy.get("sendEventSpy").should(
            "have.been.calledWith",
            "Link overview page - Help modal - Closed"
          );
       */}
      <AnalyticsContext.Provider
        value={{
          sendEvent: cy.spy().as("sendEventSpy"),
          sendPageViewEvent: cy.spy().as("sendPageViewEventSpy"),
          setUserId: cy.spy().as("setUserIdSpy"),
          setUserProperties: cy.spy().as("setUserPropertiesSpy"),
        }}
      >
        {elem}
      </AnalyticsContext.Provider>
    </OrchardProvider>
  );

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWithWrappers: typeof mountWithWrappers;
    }
  }
}

Cypress.Commands.add("mount", mount);
Cypress.Commands.add("mountWithWrappers", mountWithWrappers);
