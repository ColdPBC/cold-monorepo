/* eslint-disable */
import axios from 'axios';
import {enhancePrisma} from './enhancedPrimsa';
import {PrismaClient} from '@prisma/client';

var __TEARDOWN_MESSAGE__: string;
const EnhancedPrisma = enhancePrisma(PrismaClient);
export * from '@prisma/client';
module.exports = async function () {
  const test = require('dotenv').config();
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');
  globalThis.started_utc_on = new Date().toISOString();
  const API_ADMIN_EMAIL = process.env.API_ADMIN_EMAIL ?? 'api_user@coldclimate.com';
  const API_ADMIN_PASSWORD = process.env.API_ADMIN_PASSWORD;
  const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
  const AUTH0_TOKEN_URL = process.env.AUTH0_TOKEN_URL ?? 'https://cold-climate-staging.us.auth0.com/oauth/token';
  const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
  const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;

  const AUTH0_ORG_ID = process.env.AUTH0_ORG_ID ?? 'org_VWv3Al9pLEI4CaOH';
  let ACCESS_TOKEN: string | undefined;

  // Validate required credentials without including their values in diagnostics.
  if (API_ADMIN_PASSWORD === undefined || AUTH0_CLIENT_SECRET === undefined) {
    throw new Error('API_ADMIN_PASSWORD and AUTH0_CLIENT_SECRET must be configured for API tests');
  }

  const auth0 = axios.create();

  try {
    const authResponse = await auth0.post(
      `${AUTH0_TOKEN_URL}?organization=${AUTH0_ORG_ID}`,
      new URLSearchParams({
        grant_type: 'password',
        username: `${API_ADMIN_EMAIL}`,
        password: `${API_ADMIN_PASSWORD}`,
        audience: `${AUTH0_AUDIENCE}`,
        scope: 'offline_access, openid, profile, email',
        client_id: `${AUTH0_CLIENT_ID}`,
        client_secret: `${AUTH0_CLIENT_SECRET}`,
      }),
      { headers: { 'content-type': 'application/x-www-form-urlencoded' } },
    );

    if (authResponse?.data?.access_token) {
      if (typeof authResponse.data.access_token !== 'string') {
        throw new Error('Invalid authentication response for API tests');
      }
      ACCESS_TOKEN = authResponse.data.access_token;
      console.log('Authenticated with Auth0 for API tests');
    } else {
      console.error('Unable to get access token for API tests');
    }
  } catch (error: unknown) {
    // Provider bodies and error messages can contain authentication data.
    // Only a valid HTTP status is safe to include in this diagnostic.
    const response = (error as { response?: { status?: unknown } } | null)?.response;
    const status = response?.status;
    if (typeof status === 'number' && Number.isInteger(status) && status >= 100 && status <= 599) {
      console.error('Unable to get access token for API tests', { status });
    } else {
      console.error('Unable to get access token for API tests');
    }
    if (!response) {
      // Preserve setup rejection without exposing the original error or cause.
      throw new Error('Unable to authenticate API tests');
    }
  }

  axios.defaults.baseURL = process.env.API_SERVER_URL ?? `http://localhost:7001`;
  axios.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'application/json';
  axios.defaults.headers.patch['Content-Type'] = 'application/json';
  axios.defaults.headers.delete['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Accept'] = 'application/json';
  axios.defaults.headers.put['Accept'] = 'application/json';
  axios.defaults.headers.patch['Accept'] = 'application/json';
  axios.defaults.headers.delete['Accept'] = 'application/json';
  axios.defaults.headers.get['Accept'] = 'application/json';

  globalThis.auth0Axios = axios;
  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
