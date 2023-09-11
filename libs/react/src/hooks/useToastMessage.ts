import { useSWRConfig } from 'swr';

export function useAddToastMessage() {
  const { mutate } = useSWRConfig();

  const addToastMessage = function (message: any) {
    return mutate('messages', message, false);
  };

  return { addToastMessage };
}
