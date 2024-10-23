import { ColdRoutes } from '../routes';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { SWRConfig } from 'swr';
import { twMerge } from 'tailwind-merge';

export const Application = () => {
	const ldFlags = useFlags();

	return (
		<SWRConfig
			value={{
				keepPreviousData: ldFlags.swrKeepPreviousData,
			}}>
			<div className={twMerge('h-full w-full overflow-y-auto', ldFlags.showNewNavigationCold698 ? '' : 'overflow-x-auto max-w-[1440px] m-auto')}>
				<ColdRoutes />
			</div>
		</SWRConfig>
	);
};
