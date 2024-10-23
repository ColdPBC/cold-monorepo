import { withErrorBoundary } from 'react-error-boundary';
import { BaseButton, ErrorFallback, MainContent, SuppliersDataGrid, Tabs } from '@coldpbc/components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlags } from 'launchdarkly-react-client-sdk';

const _SuppliersPage = () => {
	const ldFlags = useFlags();
	const navigate = useNavigate();

	const getPageButtons = () => {
		return <div>{ldFlags.showCreateSupplierPageCold1014 && <BaseButton onClick={() => navigate('/suppliers/new')} label={'Add New'} className={'h-[40px]'} />}</div>;
	};

	return (
		<MainContent title="Suppliers" className={'w-[calc(100%-100px)]'} headerElement={getPageButtons()}>
			<Tabs
				tabs={[
					{
						label: 'Tier 1 Suppliers',
						content: <SuppliersDataGrid tier={1} />,
					},
					{
						label: 'Tier 2 Suppliers',
						content: <SuppliersDataGrid tier={2} />,
					},
				]}
				defaultTab={'Tier 1 Suppliers'}
			/>
		</MainContent>
	);
};

export const SuppliersPage = withErrorBoundary(_SuppliersPage, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in Suppliers: ', error);
	},
});
