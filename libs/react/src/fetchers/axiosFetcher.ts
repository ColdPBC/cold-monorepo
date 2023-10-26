import axios, { AxiosError } from 'axios';
import { set } from 'lodash';
import { resolveAPIUrl } from './helper';
import cookies from 'js-cookie';

const baseURL = resolveAPIUrl();

/**
 * Axios Fetcher function
 * @param params - Array of strings that represent the url path, method, and data to be passed to the fetcher
 */
export const axiosFetcher = (params: Array<string>) => {
  try {
    const config = {
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };

    if (params.length >= 1) {
      // Set Request Method
      set(config, 'method', params[1]);
      // Set Request Data
      if (params[2]) {
        set(config, 'data', params[2]);
      }
    } else {
      console.warn('method was not passed to the fetcher.  Defaulting to GET');
    }

    if (params.length < 1) {
      throw new Error(
        'no url path was passed to the fetcher.  This is required',
      );
    }

    return axios(params[0], config)
      .then((res) => {
        // if (
        //   params[0] ===
        //   '/organizations/org_g2zzR5rwTKVAIwCn/categories/company_decarbonization'
        // ) {
        //   // throw a 404 axios error
        //   throw new AxiosError('Request failed with status code 404', '404');
        // }
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  } catch (e) {
    console.error(e);
    return e;
  }
};
