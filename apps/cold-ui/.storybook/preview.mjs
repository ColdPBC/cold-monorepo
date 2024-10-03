import documentationTemplate from './documentationTemplate.mdx';
import '../src/styles.css';
import 'flowbite';
import {auth0UserMock, worker} from '../../../libs/react/src';
import {StyledEngineProvider, ThemeProvider} from "@mui/material";
import {muiTheme} from "../../../libs/react/src/themes/muiTheme";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

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
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
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
        showTeamMemberTable: true,
        showNewsModuleCold310: true,
        showNextStepsCard: true,
        showComplianceModule: true,
        showDocumentsUploadModuleCold492: true,
        showREIComplianceMVPSidebarCold506: true,
        showNewHomePageComplianceReiMvp: true,
        complianceSetFlowMarkdown:
          "#Automate your REI Consolidated Form \n Upload company policies, documents, or other resources and Cold Climate will autofill the form. Cold Climate uses AI to pre-fill each question based on your information. \n\nYou'll always be able to review and edit yourself before submitting anything. \n\nYou can upload as many or as few documents as you want. We recommend uploading any of the following for REI. \n1. Your previous year REI PIA Compliance completed answers and impact assessment documents \n2. Other retailer sustainability compliance forms \n3. Supplier code of conduct \n4. Climate or environmental impact statements or documents \n5. Sustainability Certifications \n6. Diversity and Inclusion policies",
        showNewCarbonFootprintModuleCold634: true,
        showNewCompliancePageHomeCold671: true,
        swrKeepPreviousData: true,
        showNewNavigationCold698: true,
        showNewComplianceManagerCold711: true,
        showNewComplianceManagerPreviewCold713: true,
        showSuppliersPageCold890: true,
        showNewDocumentsPage: true,
        showMaterialsPageCold912: true,
      },
    },
  },
  decorators: [
    Story => {
      return StyledEngineProvider({
        injectFirst: true,
        children: LocalizationProvider({
          dateAdapter: AdapterDateFns,
          children: ThemeProvider({theme: muiTheme, children: Story()})
        })
      })
    },
  ],
};
