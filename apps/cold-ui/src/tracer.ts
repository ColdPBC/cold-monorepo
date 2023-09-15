import { datadogRum } from '@datadog/browser-rum';
import { get } from 'lodash';
datadogRum.init({
  applicationId: `${get(import.meta, 'env.VITE_DD_RUM_APPLICATION_ID', '')}`,
  clientToken: `${get(import.meta, 'env.VITE_DD_RUM_CLIENT_TOKEN', '')}`,
  site: 'us5.datadoghq.com',
  service: 'ui',
  env: `${get(import.meta, 'env.DD_ENV', '')}`,
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  premiumSampleRate: 100,
  trackUserInteractions: true,
  defaultPrivacyLevel: 'mask-user-input',
});

datadogRum.startSessionReplayRecording();
