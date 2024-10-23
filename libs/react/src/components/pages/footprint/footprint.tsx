import React from 'react';
import {
	AppContent,
	CenterColumnContent,
	DismissableInfoCard,
	EmissionsDonutChartVariants,
	ErrorFallback,
	FootprintDetailCard,
	FootprintOverviewCard,
	RightColumnContent,
	Spinner,
} from '@coldpbc/components';
import { useAuth0 } from '@auth0/auth0-react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { some } from 'lodash';
import { getSchemeForColor, HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';

const PERIOD = 2023;

function _Footprint() {
	const auth0 = useAuth0();
	const { logError, logBrowser } = useColdContext();
	// Get footprint data from SWR
	const { data, error, isLoading } = useOrgSWR<any>(['/categories/company_decarbonization', 'GET'], axiosFetcher);

	if (error) {
		logBrowser('Error fetching footprint data', 'error', { ...error }, error);
		logError(error, ErrorType.SWRError);
		return null;
	}

	const isEmptyFootprintData =
		!isLoading &&
		!some(data.subcategories, (subcategory: any) =>
			some(subcategory.activities, (activity: any) => activity.footprint?.[PERIOD] && activity.footprint?.[PERIOD].value !== undefined),
		);

	if (auth0.isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	if (auth0.error) {
		logBrowser('Error fetching auth0 user', 'error', { ...auth0.error }, auth0.error);
		logError(auth0.error, ErrorType.Auth0Error);
		return null;
	}

	if (auth0.user) {
		logBrowser('Footprint page loaded', 'info', {
			user: auth0.user,
			isEmptyFootprintData,
		});
		return (
			<AppContent title="Footprint">
				<CenterColumnContent>
					{!isEmptyFootprintData ? (
						<>
							<FootprintDetailCard colors={getSchemeForColor(HexColors.lightblue)} period={PERIOD} subcategory_key="facilities" />
							<FootprintDetailCard colors={getSchemeForColor(HexColors.teal)} period={PERIOD} subcategory_key="product" />
							<FootprintDetailCard colors={getSchemeForColor(HexColors.green)} period={PERIOD} subcategory_key="operations" />
							<FootprintDetailCard colors={getSchemeForColor(HexColors.purple)} period={PERIOD} subcategory_key="travel" />
						</>
					) : (
						<>
							<DismissableInfoCard
								text="Your footprint is a snapshot of the greenhouse gases your company emitted over a specific timeframe. It is measured in tons of carbon dioxide equivalent, expressed as tCO2e."
								onDismiss={() => {}}
								dismissKey="footprint-page"
							/>
							<FootprintOverviewCard chartVariant={EmissionsDonutChartVariants.horizontal} headerless />
						</>
					)}
				</CenterColumnContent>
				<RightColumnContent>
					<FootprintOverviewCard chartVariant={EmissionsDonutChartVariants.vertical} />
				</RightColumnContent>
			</AppContent>
		);
	}

	return null;
}

export const Footprint = withErrorBoundary(_Footprint, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in Footprint: ', error);
	},
});
