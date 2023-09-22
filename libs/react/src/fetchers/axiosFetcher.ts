import axios from 'axios';
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
    const raw = cookies.get('coldpbc');
    const coldpbc = raw ? JSON.parse(raw) : null;
    const token = coldpbc ? coldpbc.accessToken : null;

    const config = {
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
