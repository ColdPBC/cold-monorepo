import documentationTemplate from "./documentationTemplate.mdx";
import "../src/styles.css";
import "flowbite";
import { auth0UserMock, worker } from "../../../libs/react/src";

// Storybook executes this module in both bootstap phase (Node)
// and a story's runtime (browser). However, we cannot call `setupWorker`
// in Node environment, so need to check if we're in a browser.
if (typeof global.process === 'undefined' || global.process.title === 'browser') {

  // Start the mocking when each story is loaded.
  // Repetitive calls to the `.start()` method do not register a new worker,
  // but check whether there's an existing once, reusing it, if so.
  worker.start({
    onUnhandledRequest(req) {
      const reqToSelf = req.url.href.includes('http://localhost:4400') || req.url.href.includes('chromatic.com');
      const reqToApi = req.url.href.includes('http://localhost:7001') || req.url.href.includes('https://api.coldclimate.test');

      if (!reqToSelf && reqToApi) {
        console.warn(
          'Found an unhandled API Request:  %s request to %s',
          req.method,
          req.url.href,
        )
      }
    },
  }).then((r) => console.log(r));
}

export default {
  parameters: {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    previewTabs: {
      "storybook/docs/panel": {index: -1},
    },
    docs: {
      page: documentationTemplate,
    },
    backgrounds: {
      default: 'cold',
      values: [
        {
          name: 'cold',
          value: '#080912',
        },
        {
          name: 'white',
          value: '#FFFFFF'
        },
      ],
    },
    cookie: {
      "coldpbc": {
        accessToken: "accessToken",
        user: auth0UserMock,
      }
    },
    auth0AddOn: {
      isLoading: false,
      isAuthenticated: true,
      getAccessTokenSilently: () => {
        return "accessToken"
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      getAccessTokenWithPopup: () => {
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      getIdTokenClaims: () => {
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      loginWithRedirect: () => {
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      loginWithPopup: () => {
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      logout: () => {
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handleRedirectCallback: () => {
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      buildAuthorizeUrl: () => {
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      buildLogoutUrl: () => {
      },
      user: auth0UserMock,
    },
    launchdarkly: {
      flags: {
        showTeamMemberTable: true,
        showActions261: true,
        showNewsModuleCold310: true,
        showNextStepsCard: true,
        showComplianceModule: true,
        showDocumentsUploadModuleCold492: true,
        showREIComplianceMVPSidebarCold506: false,
        showNewHomePageComplianceReiMvp: false
      },
    },
  },
  decorators: [],
};
