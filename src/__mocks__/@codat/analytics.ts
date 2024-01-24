import {
  AnalyticsProvider,
  EventContextProvider,
  MockAnalyticsProvider,
} from "@codat/analytics";

interface MockUseAnalyticsResponse {
  sendEvent: () => void;
  sendPageViewEvent: () => void;
  setUserId: () => void;
  setUserProperties: () => void;
}

const useAnalyticsReponse = {
  sendEvent: jest.fn(),
  sendPageViewEvent: jest.fn(),
  setUserId: jest.fn(),
  setUserProperties: jest.fn(),
};

export { EventContextProvider, AnalyticsProvider, MockAnalyticsProvider };

export function useAnalytics(): MockUseAnalyticsResponse {
  return useAnalyticsReponse;
}

export const withEventContext = (component: unknown) => component;
