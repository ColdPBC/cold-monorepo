import { axiosFetcher } from '../fetchers/axiosFetcher';
import { TableActionType } from '../interfaces/tableAction';

export function useExecuteAction() {
  const executeAction = (action: TableActionType) => {
    const { url, urls, method, data } = action;

    if (urls) {
      return Promise.all(
        urls.map((url: any) => {
          return axiosFetcher([url, method, JSON.stringify(data)]);
        }),
      );
    } else {
      return axiosFetcher([url, method, JSON.stringify(data)]);
    }
  };
  return { executeAction };
}
