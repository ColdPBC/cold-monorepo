import axios from 'axios';
import { isArray, set } from 'lodash';
import { resolveAPIUrl } from './helper';

const baseURL = resolveAPIUrl();

/**
 * Axios Fetcher function
 * @param params - Array of strings that represent the url path, method, data and headers to be passed to the fetcher
 */
export const axiosFetcher = (params: Array<any>) => {
	try {
		const passedConfig = params[3] ? JSON.parse(params[3]) : {};

		const config = {
			baseURL: baseURL,
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'GET',
			...passedConfig,
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

		if (isArray(params[0])) {
			// then there is multiple urls to be called
			return Promise.all(
				params[0].map(url =>
					axios(url, config)
						.then(res => {
							return res.data;
						})
						.catch(err => {
							return err;
						}),
				),
			);
		} else {
			return axios(params[0], config)
				.then(res => {
					return res.data;
				})
				.catch(err => {
					return err;
				});
		}
	} catch (e) {
		console.error(e);
		return e;
	}
};
