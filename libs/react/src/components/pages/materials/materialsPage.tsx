import { BaseButton, ErrorFallback, MainContent, MaterialsDataGrid } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlags } from 'launchdarkly-react-client-sdk';

const _MaterialsPage = () => {
	const navigate = useNavigate();
	const ldFlags = useFlags();
	const getPageButtons = () => {
		return <div>{ldFlags.showCreateMaterialPageCold1015 && <BaseButton onClick={() => navigate('/materials/new')} label={'Add New'} className={'h-[40px]'} />}</div>;
	};

	return (
		<MainContent title="Materials" headerElement={getPageButtons()} className={'w-[calc(100%-100px)]'}>
			<MaterialsDataGrid />
		</MainContent>
	);
};

export const MaterialsPage = withErrorBoundary(_MaterialsPage, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
