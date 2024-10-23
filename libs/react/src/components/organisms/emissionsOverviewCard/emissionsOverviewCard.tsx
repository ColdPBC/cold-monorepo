import React from 'react';
import { EmissionsScopesCardVariants } from '@coldpbc/enums';
import { EmissionsScopesCard, ErrorFallback } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { ColdEmissionsProvider } from '@coldpbc/providers';

const _EmissionsOverviewCard = () => {
	return (
		<ColdEmissionsProvider>
			<EmissionsScopesCard variant={EmissionsScopesCardVariants.horizontal} title={'Emissions Overview'} />
		</ColdEmissionsProvider>
	);
};

export const EmissionsOverviewCard = withErrorBoundary(_EmissionsOverviewCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
