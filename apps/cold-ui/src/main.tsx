import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Home } from './app/home';
import { ColdContextProvider } from '@coldpbc/providers';
import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { muiTheme } from '../../../libs/react/src/themes/muiTheme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_COLD_API_AUDIENCE;
const launchDarklyClientSideId = import.meta.env.VITE_LD_CLIENT_SIDE_ID;
const urlParams = new URLSearchParams(document.location.search);
datadogRum.init({
  clientToken: 'pub92f690b0e4706ca7b9d2e7d7481f383e',
  applicationId: '8d5928f4-f01f-4f10-8ac5-979d8989c8f3',
  site: 'us5.datadoghq.com',
  service: 'ui',
  env: import.meta.env.VITE_DD_ENV,
  allowedTracingUrls: [url => url.startsWith('<https://api.coldclimate>')],
  version: import.meta.env.VITE_DD_VERSION,
  sessionSampleRate: 100,
  premiumSampleRate: 100,
  defaultPrivacyLevel: 'mask-user-input',
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
});
datadogRum.startSessionReplayRecording();

datadogLogs.init({
  clientToken: 'pub92f690b0e4706ca7b9d2e7d7481f383e',
  site: 'us5.datadoghq.com',
  service: 'ui',
  forwardErrorsToLogs: true,
  env: import.meta.env.VITE_DD_ENV,
  version: import.meta.env.VITE_DD_VERSION,
  sessionSampleRate: 100,
});

root.render(
  <StrictMode>
    <ColdContextProvider
      auth0Options={{
        domain: domain,
        clientId: clientId,
        authorizationParams: {
          redirect_uri: window.location.origin + '/callback',
          audience: audience,
          invitation: urlParams.get('invitation') || undefined,
          organization: urlParams.get('organization') || undefined,
          organization_name: urlParams.get('organization_name') || undefined,
        },
      }}
      launchDarklyClientSideId={launchDarklyClientSideId}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <Home />
        </ThemeProvider>
      </StyledEngineProvider>
    </ColdContextProvider>
  </StrictMode>,
);
