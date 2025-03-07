import { set } from 'lodash';
import {resolveOpenAIServiceURL} from './helper';
import {axiosFetcher} from "./axiosFetcher";

const baseURL = resolveOpenAIServiceURL();

export const openAiServiceFetcher = (params: Array<any>) => {

  try {
    const passedConfig = params[3] ? JSON.parse(params[3]) : {};

    // Set the baseURL in params[3]
    set(passedConfig, 'baseURL', baseURL);
    set(params, 3, JSON.stringify(passedConfig));
    return axiosFetcher(params);
  } catch (e) {
    console.error('Error in openAiServiceFetcher', e);
    return e;
  }
};
