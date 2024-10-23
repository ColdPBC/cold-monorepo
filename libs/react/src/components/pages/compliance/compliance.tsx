import React from 'react';
import { CompliancePageWrapper, ErrorFallback } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { ColdComplianceSetsProvider } from '@coldpbc/providers';

const _CompliancePage = () => {
	return (
		<ColdComplianceSetsProvider>
			<CompliancePageWrapper />
		</ColdComplianceSetsProvider>
	);
};

export const CompliancePage = withErrorBoundary(_CompliancePage, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
