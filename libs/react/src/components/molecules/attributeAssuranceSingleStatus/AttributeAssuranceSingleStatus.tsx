import { getAggregateStatusFromAttributeAssurances, toSentenceCase } from '@coldpbc/lib';
import { ColdIcon, ErrorFallback } from '@coldpbc/components';
import React from 'react';
import { SustainabilityAttribute } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { differenceInDays, format } from 'date-fns';
import { AttributeAssuranceStatus, IconNames } from '@coldpbc/enums';

interface AttributeAssuranceStatusProps {
  sustainabilityAttribute: SustainabilityAttribute;
}

const _AttributeAssuranceSingleStatus: React.FC<AttributeAssuranceStatusProps> = ({ sustainabilityAttribute }) => {
  const {
    assuranceStatus,
    assuranceExpiration
  } = getAggregateStatusFromAttributeAssurances(sustainabilityAttribute.attributeAssurances);

  let iconName: IconNames;
  let statusMessage = toSentenceCase(assuranceStatus);
  let statusColorClass: string;
  let subStatusMessage: string;

  switch (assuranceStatus) {
    case AttributeAssuranceStatus.ACTIVE:
      iconName = IconNames.ColdCheckIcon;
      statusColorClass = 'text-green-200';
      subStatusMessage = !assuranceExpiration ? '' : `Expires ${format(assuranceExpiration, 'M/d/yy')}`;
      break;
    case AttributeAssuranceStatus.EXPIRING:
      iconName = IconNames.ColdExpiringIcon;
      statusMessage = !assuranceExpiration ? 'Expiring' : `${differenceInDays(assuranceExpiration, new Date())} days`
      statusColorClass = 'text-yellow-200';
      subStatusMessage = !assuranceExpiration ? '' : `Expires ${format(assuranceExpiration, 'M/d/yy')}`;
      break;
    case AttributeAssuranceStatus.EXPIRED:
      iconName = IconNames.ColdCalendarCloseIcon;
      statusColorClass = 'text-gray-200';
      subStatusMessage = !assuranceExpiration ? '' : `Expired on ${format(assuranceExpiration, 'M/d/yy')}`;
      break;
    case AttributeAssuranceStatus.MISSING_DATE:
      iconName = IconNames.ColdUnknownIcon;
      statusColorClass = 'text-gray-200';
      subStatusMessage = 'Expiration Unknown';
      break;
    case AttributeAssuranceStatus.NOT_DOCUMENTED:
      iconName = IconNames.ColdDangerIcon;
      statusColorClass = 'text-red-200';
      subStatusMessage = 'Expiration Unknown';
      break;
    default:
      throw new Error('Unexpected AttributeAssuranceStatus');
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ColdIcon name={iconName} color="currentColor" className={statusColorClass} />
        <span className={`text-body ${statusColorClass}`}>{statusMessage}</span>
      </div>
      <span className='text-body text-tc-disabled'>{subStatusMessage}</span>
    </div>
  );
};

export const AttributeAssuranceSingleStatus = withErrorBoundary(_AttributeAssuranceSingleStatus, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, _info) => {
    console.error('Error occurred in AttributeAssuranceStatus: ', error);
  },
});

