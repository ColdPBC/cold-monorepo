import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ColdIcon, ErrorFallback } from '@coldpbc/components';
import { AttributeAssuranceStatus, IconNames } from '@coldpbc/enums';
import { toSentenceCase } from '@coldpbc/lib';
import { differenceInDays } from 'date-fns';

interface AttributeAssuranceStatusLabelProps {
  status: AttributeAssuranceStatus;
  effectiveEndDate?: Date | null;
}

const _AttributeAssuranceStatusLabel: React.FC<AttributeAssuranceStatusLabelProps> = ({ status, effectiveEndDate }) => {
	let iconName: IconNames;
	let statusMessage = toSentenceCase(status);
	let statusColorClass: string;

	switch (status) {
		case AttributeAssuranceStatus.ACTIVE:
			iconName = IconNames.ColdCheckIcon;
			statusColorClass = 'text-green-200';
			break;
		case AttributeAssuranceStatus.EXPIRING:
			iconName = IconNames.ColdExpiringIcon;
			statusMessage = !effectiveEndDate ? 'Expiring' : `${differenceInDays(effectiveEndDate, new Date())} days`;
			statusColorClass = 'text-yellow-200';
			break;
		case AttributeAssuranceStatus.EXPIRED:
			iconName = IconNames.ColdCalendarCloseIcon;
			statusColorClass = 'text-gray-200';
			break;
		case AttributeAssuranceStatus.MISSING_DATE:
			iconName = IconNames.ColdUnknownIcon;
			statusColorClass = 'text-gray-200';
			break;
		case AttributeAssuranceStatus.NOT_DOCUMENTED:
			iconName = IconNames.ColdDangerIcon;
			statusColorClass = 'text-red-200';
			break;
		default:
			throw new Error('Unexpected AttributeAssuranceStatus');
	}

	return (
		<div className="flex items-center gap-2">
			<div className="flex items-center justify-center w-5 h-5">
				<ColdIcon
          name={iconName}
          color="currentColor"
          className={`${statusColorClass} ${[IconNames.ColdExpiringIcon, IconNames.ColdCalendarCloseIcon].includes(iconName) ? 'w-[14px] h-[14px]' : 'w-full h-full'}`} />
			</div>
			<span className={`text-body ${statusColorClass}`}>{statusMessage}</span>
		</div>
	);
};

export const AttributeAssuranceStatusLabel = withErrorBoundary(_AttributeAssuranceStatusLabel, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, _info) => {
		console.error('Error occurred in AttributeAssuranceStatusLabel: ', error);
	},
});
