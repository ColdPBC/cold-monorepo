import documentationTemplate from './documentationTemplate.mdx';
import '../src/styles.css';
import 'flowbite';
import {auth0UserMock, worker} from '../../../libs/react/src';
import {CustomDecorators} from "./customDecorators";

// Storybook executes this module in both bootstap phase (Node)
// and a story's runtime (browser). However, we cannot call `setupWorker`
// in Node environment, so need to check if we're in a browser.
if (typeof global.process === 'undefined' || global.process.title === 'browser') {
  // Start the mocking when each story is loaded.
  // Repetitive calls to the `.start()` method do not register a new worker,
  // but check whether there's an existing once, reusing it, if so.
  worker
    .start({
      onUnhandledRequest: 'bypass',
    })
    .then(r => console.log(r));
}

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', '*']
      }
    },
    previewTabs: {
      'storybook/docs/panel': {index: -1},
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
          value: '#FFFFFF',
        },
      ],
    },
    cookie: {
      coldpbc: {
        accessToken: 'accessToken',
        user: auth0UserMock,
      },
    },
    auth0AddOn: {
      isLoading: false,
      isAuthenticated: true,
      getAccessTokenSilently: () => {
        return 'accessToken';
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
        swrKeepPreviousData: true,
        productCarbonFootprintMvp: true,
        showBillingPageCold957: true,
        showNewDocumentUploadUxCold1410: true,
        showNewPcfUiCold1450: true,
        showAiSustainabilibuddyCold1464: true,
        showSspDatagridExportButton: true,
        showRegulationsPage: true,
      },
    },
  },

  decorators: [
    (Story, context) => CustomDecorators(Story, context, import.meta.env.STORYBOOK_MUI_LICENSE_KEY),
  ],

  tags: ['autodocs']
};
