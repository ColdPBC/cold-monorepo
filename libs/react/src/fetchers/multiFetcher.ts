import {axiosFetcher} from './axiosFetcher';

/**
 * Multi Fetcher function : Function to fetch from multiple urls
 * @param params - Array of strings that represent the url path, method, data and headers to be passed to the fetcher
 */
export const multiFetcher = (params: Array<any>) => {
	const urls = params[0] as Array<string>;
	return Promise.all(urls.map(url => axiosFetcher([url, ...params.slice(1)])));
};
