import { AttributeAssuranceStatusLabel, ErrorFallback } from '@coldpbc/components';
import React from 'react';
import { SustainabilityAttribute, SustainabilityAttributeAssurance } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { format } from 'date-fns';
import { AttributeAssuranceStatus } from '@coldpbc/enums';

interface AttributeAssuranceStatusProps {
  sustainabilityAttribute: SustainabilityAttribute;
}

const _AttributeAssuranceSingleStatus: React.FC<AttributeAssuranceStatusProps> = ({ sustainabilityAttribute }) => {
  let attributeAssurance: SustainabilityAttributeAssurance;

  // This component is intended for when there is 1 AttributeAssurance,
  // e.g. when showing Product-level attributes on a Product details page,
  // so we arbitrarily show the first assurance in the list.
  if (sustainabilityAttribute.attributeAssurances.length === 0) {
    return null;
  } else {
    attributeAssurance = sustainabilityAttribute.attributeAssurances[0];
  }

  let subStatusMessage: string;

  switch (attributeAssurance.status) {
    case AttributeAssuranceStatus.ACTIVE:
    case AttributeAssuranceStatus.EXPIRING:
      subStatusMessage = !attributeAssurance.effectiveEndDate ? '' : `Expires ${format(attributeAssurance.effectiveEndDate, 'M/d/yy')}`;
      break;
    case AttributeAssuranceStatus.EXPIRED:
      subStatusMessage = !attributeAssurance.effectiveEndDate ? '' : `Expired on ${format(attributeAssurance.effectiveEndDate, 'M/d/yy')}`;
      break;
    case AttributeAssuranceStatus.MISSING_DATE:
    case AttributeAssuranceStatus.NOT_DOCUMENTED:
      subStatusMessage = 'Expiration Unknown';
      break;
    default:
      throw new Error('Unexpected AttributeAssuranceStatus');
  }

  return (
    <div className="w-full flex items-center justify-between">
      <AttributeAssuranceStatusLabel status={attributeAssurance.status} effectiveEndDate={attributeAssurance.effectiveEndDate} />
      <span className='chromatic-ignore text-body text-tc-disabled'>{subStatusMessage}</span>
    </div>
  );
};

export const AttributeAssuranceSingleStatus = withErrorBoundary(_AttributeAssuranceSingleStatus, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, _info) => {
    console.error('Error occurred in AttributeAssuranceStatus: ', error);
  },
});

