import { BaseButton, ErrorFallback, MainContent, MaterialsDataGrid } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { ButtonTypes } from '@coldpbc/enums';

const _MaterialsPage = () => {
	const [addMaterialDialogOpen, setAddMaterialDialogOpen] = React.useState(false);

	const getPageButtons = () => {
		return (
			<div className="flex justify-end h-[40px]">
				<BaseButton variant={ButtonTypes.primary} onClick={() => setAddMaterialDialogOpen(true)} label="Add New" />
			</div>
		);
	};

	return (
		<MainContent title="Materials" headerElement={getPageButtons()}>
			<MaterialsDataGrid />
		</MainContent>
	);
};

export const MaterialsPage = withErrorBoundary(_MaterialsPage, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
