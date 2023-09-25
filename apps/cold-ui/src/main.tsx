import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Home } from './app/home';
import { ColdContextProvider } from '@coldpbc/providers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_COLD_API_AUDIENCE;
const launchDarklyClientSideId = import.meta.env.VITE_LD_CLIENT_SIDE_ID;
const urlParams = new URLSearchParams(document.location.search);

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
      launchDarklyClientSideId={launchDarklyClientSideId}
    >
      <Home />
    </ColdContextProvider>
  </StrictMode>,
);
