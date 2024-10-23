import { useSWRConfig } from 'swr';
import { ToastMessageType } from '@coldpbc/interfaces';

export function useAddToastMessage() {
	const { mutate } = useSWRConfig();

	const addToastMessage = function (message: ToastMessageType) {
		return mutate('messages', message);
	};

	return { addToastMessage };
}
