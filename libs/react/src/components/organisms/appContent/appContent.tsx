import React, { PropsWithChildren } from 'react';
import { Spinner } from '../../atoms';
import { GlobalSizes } from '@coldpbc/enums';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { twMerge } from 'tailwind-merge';

export interface AppContentProps {
	title?: string;
	isLoading?: boolean;
}

export function AppContent(props: PropsWithChildren<AppContentProps>) {
	const ldFlags = useFlags();

	return (
		<div className={twMerge('w-[1129px]', ldFlags.showNewNavigationCold698 ? 'py-[40px] ml-[50px]' : '')}>
			{
				// show title if we have one
				props.title && <div className="text-h1 self-stretch text-tc-primary mb-4">{props.title}</div>
			}
			<div className="flex gap-6 flex-1">{props.isLoading ? <Spinner size={GlobalSizes.xLarge} /> : props.children}</div>
		</div>
	);
}
