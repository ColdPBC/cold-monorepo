import { Outlet, useSearchParams } from 'react-router-dom';
import { ActionDetail } from '@coldpbc/components';

export const Interceptor = () => {
	const [params] = useSearchParams();
	const actionId = params.get('actionId');

	return (
		<>
			<Outlet />
			{actionId && <ActionDetail id={actionId} />}
		</>
	);
};
