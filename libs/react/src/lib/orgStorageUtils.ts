import { isString } from 'lodash';

export const getOrgStorage = (orgId: string) => {
  const orgStorage = sessionStorage.getItem(orgId);
  return orgStorage ? JSON.parse(orgStorage) : {};
};

export const setOrgStorage = (orgId: string, value: string | object) => {
  if (isString(value)) {
    sessionStorage.setItem(orgId, value);
  } else {
    sessionStorage.setItem(orgId, JSON.stringify(value));
  }
};

export const addToOrgStorage = (orgId: string, key: string, value: string | object) => {
  const parsedOrgStorage = getOrgStorage(orgId);
  parsedOrgStorage[key] = value;
  setOrgStorage(orgId, parsedOrgStorage);
}


export const getFromOrgStorage = (orgId: string | undefined, key: string) => {
  if (!orgId) return undefined;
  const orgStorage = getOrgStorage(orgId);
  return orgStorage[key];
}
