import { PropsWithChildren, ReactNode, useState } from 'react';
import { Card } from '../card/card';
import { useNavigate } from 'react-router-dom';
import { FootprintDetailChart } from '../footprintDetailChart';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { useOrgSWR } from '../../../hooks/useOrgSWR';
import { useColdContext } from '@coldpbc/hooks';
import { ButtonTypes, ErrorType } from '@coldpbc/enums';
import { ActionPayload } from '@coldpbc/interfaces';

export interface FootprintDetailCardProps {
	colors: string[];
	subcategory_key: string;
	period: number;
	className?: string;
}

function _FootprintDetailCard(props: PropsWithChildren<FootprintDetailCardProps>) {
	const ldFlags = useFlags();
	const navigate = useNavigate();
	const [isEmpty, setIsEmpty] = useState(false);
	const { data: actionsData, error: actionsError } = useOrgSWR<ActionPayload[], any>(ldFlags.showActions261 ? [`/actions`, 'GET'] : null, axiosFetcher);
	const { data, error } = useOrgSWR<any>(['/categories/company_decarbonization', 'GET'], axiosFetcher);
	const { logError, logBrowser } = useColdContext();

	if (isEmpty) {
		return null;
	}

	if (error) {
		logBrowser('Error fetching footprint data', 'error', { ...error }, error);
		logError(error, ErrorType.SWRError);
		return null;
	}

	const subcategoryName = data?.subcategories[props.subcategory_key]?.subcategory_name;

	const { className, ...rest } = props;

	const getCtas = (subcategoryName: string) => {
		const ctas: {
			text?: string;
			action?: () => void;
			variant?: ButtonTypes;
			child?: ReactNode;
		}[] = [];
		if (ldFlags.showActions261) {
			// if there are no actions for this subcategory, navigate to the /actions page
			if (!actionsData?.some(action => action.action.subcategory === props.subcategory_key)) {
				ctas.push({
					text: `View ${subcategoryName} Actions`,
					action: () => {
						navigate(`/actions`);
					},
				});
			} else {
				ctas.push({
					text: `View ${subcategoryName} Actions`,
					action: () => {
						navigate(`/actions/${props.subcategory_key}`);
					},
				});
			}
		}
		return ctas;
	};

	logBrowser('Footprint data loaded', 'info', {
		isEmpty,
		data,
		actionsData,
		actionsError,
	});

	return (
		<Card title={subcategoryName} ctas={getCtas(subcategoryName)} className={className} data-testid={`footprint-detail-card-${props.subcategory_key}`}>
			<div className="flex items-center justify-center self-stretch flex-col">
				<FootprintDetailChart {...rest} setIsEmpty={setIsEmpty} />
			</div>
		</Card>
	);
}

export const FootprintDetailCard = withErrorBoundary(_FootprintDetailCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in FootprintDetailCard: ', error);
	},
});
