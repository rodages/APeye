import {
  CodatAuthContext,
  CodatAuthContextType,
} from "@codat/client-cookie-manager";
import { OrchardProvider } from "@codat/orchard-ui";
import { render } from "@testing-library/react";
import { MemoryHistory, createMemoryHistory } from "history";
import { User, UserManager } from "oidc-react";
import { Router } from "react-router-dom";
import Cookies from "universal-cookie";

import auth0Config from "config/auth0Config";

const Wrapper: React.FC<
  React.PropsWithChildren<{ history: MemoryHistory }>
> = ({ children, history }) => {
  return (
    <OrchardProvider appId="app-test" suppressColorStyles>
      <Router navigator={history} location={history.location}>
        {children}
      </Router>
    </OrchardProvider>
  );
};

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = "/" } = {},
  search = ""
) => {
  const history = createMemoryHistory();
  history.push({
    pathname: route,
    search,
  });

  return {
    renderResult: render(ui, {
      // eslint-disable-next-line react/display-name
      wrapper: ({ children }) => (
        <Wrapper history={history}>{children}</Wrapper>
      ),
    }),
    history,
  };
};

const renderWithoutRouter = (ui: React.ReactElement) => ({
  renderResult: render(
    <OrchardProvider appId="app-test" suppressColorStyles>
      {ui}
    </OrchardProvider>
  ),
});

const cookies = new Cookies();
const tokenCookie = cookies.get("mock_token");
export const MockAuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const mock: CodatAuthContextType = {
    authType: "OIDC",
    signIn: () => {
      cookies.set("last-auth-action", "sign-in");
      return Promise.resolve();
    },
    signInPopup: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
    signOutRedirect: () => Promise.resolve(),
    userManager: {} as UserManager,
    userData: {
      access_token: tokenCookie,
    } as User,
    isLoading: false,
    selectClient: () => {
      /* This function intentionally left blank */
    },
    roles: [],
    clearAuth0Cookies: () => {
      cookies.remove(`auth0.${auth0Config?.clientId}.is.authenticated`, {
        path: "/",
        domain: window.location.host,
      });
      cookies.remove(`auth0.${auth0Config?.clientId}.is.authenticated`, {
        path: "/",
        domain: window.location.host,
      });
    },
  };

  return (
    <CodatAuthContext.Provider value={mock}>
      {children}
    </CodatAuthContext.Provider>
  );
};

// override render
export { renderWithRouter as render, renderWithoutRouter };
