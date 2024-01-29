import { set } from 'lodash';
import axios from 'axios';
import { resolveOpenAIUrl } from './helper';

export const openAIFetcher = (params: Array<any>) => {
  try {
    // get headers from the params, if they exist
    const headers = params[3] ? JSON.parse(params[3]) : {};

    const config = {
      baseURL: resolveOpenAIUrl(),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
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
      throw new Error('no url path was passed to the fetcher.  This is required');
    }

    return axios(params[0], config)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return err;
      });
  } catch (e) {
    console.error(e);
    return e;
  }
};
