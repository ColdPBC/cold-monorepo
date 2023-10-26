import { axiosFetcher } from '../fetchers/axiosFetcher';
import { TableActionType } from '../interfaces/tableAction';

export function useExecuteAction() {
  const executeAction = (action: TableActionType) => (
    Promise.all(
      action.apiRequests.map(({ url, method, data = {} }) => axiosFetcher([url, method, JSON.stringify(data)])),
    )
  );
  
  return { executeAction };
}
