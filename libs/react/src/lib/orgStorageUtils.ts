import { isString } from 'lodash';

export const getOrgStorage = (key: string) => {
	const orgStorage = localStorage.getItem(key);
	return orgStorage ? JSON.parse(orgStorage) : {};
};

export const setOrgStorage = (key: string, value: string | object) => {
	if (isString(value)) {
		localStorage.setItem(key, value);
	} else {
		localStorage.setItem(key, JSON.stringify(value));
	}
};
