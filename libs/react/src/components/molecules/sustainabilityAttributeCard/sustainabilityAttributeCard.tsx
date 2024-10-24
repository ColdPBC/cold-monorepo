import React, { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { AttributeAssuranceGraph, AttributeAssuranceSingleStatus } from '@coldpbc/components';
import { SustainabilityAttribute, SustainabilityAttributeAssurance } from '@coldpbc/interfaces';
import { getAggregateStatusFromAttributeAssurances } from '@coldpbc/lib';
import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';

interface SustainabilityAttributeCardProps {
  sustainabilityAttribute: SustainabilityAttribute;
  cardStyle?: SustainabilityAttributeCardStyle;
}

export enum SustainabilityAttributeCardStyle {
  GRAPH = 'GRAPH',
  SINGLE_STATUS = 'SINGLE_STATUS',
}

const DEFAULT_ICON_URL = 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/NoImage.png';

interface SustainabilityAttributeAssuranceData {
  activeCount: number;
  inactiveCount: number;
  notDocumentedCount: number;
}

function processSustainabilityAttribute(attribute: SustainabilityAttribute): SustainabilityAttributeAssuranceData {
  const result: SustainabilityAttributeAssuranceData = {
    activeCount: 0,
    inactiveCount: 0,
    notDocumentedCount: 0,
  };

  const entityAssurances = new Map<string, SustainabilityAttributeAssurance[]>();

  // Group assurances by entity ID
  attribute.attributeAssurances.forEach(assurance => {
    let entityId: string | undefined;

    switch (attribute.level) {
      case EntityLevel.MATERIAL:
        entityId = assurance.material?.id;
        break;
      case EntityLevel.ORGANIZATION:
        entityId = assurance.organization?.id;
        break;
      case EntityLevel.PRODUCT:
        entityId = assurance.product?.id;
        break;
      case EntityLevel.SUPPLIER:
        entityId = assurance.organizationFacility?.id;
        break;
    }

    if (entityId) {
      if (!entityAssurances.has(entityId)) {
        entityAssurances.set(entityId, []);
      }
      entityAssurances.get(entityId)!.push(assurance);
    }
  });

  // Process grouped assurances
  entityAssurances.forEach((assurances, _entityId) => {
    const { assuranceStatus } = getAggregateStatusFromAttributeAssurances(assurances);

    if (assuranceStatus === AttributeAssuranceStatus.ACTIVE || assuranceStatus === AttributeAssuranceStatus.EXPIRING) {
      result.activeCount++;
    } else if (assuranceStatus === AttributeAssuranceStatus.EXPIRED || assuranceStatus === AttributeAssuranceStatus.MISSING_DATE) {
      result.inactiveCount++;
    } else {
      result.notDocumentedCount++;
    }
  });

  return result;
}

const _SustainabilityAttributeCard: React.FC<SustainabilityAttributeCardProps> = ({ sustainabilityAttribute, cardStyle }) => {
	// If we don't get a logo image from the backend, we'll use the default
	const [imgSrc, setImgSrc] = useState<string>(sustainabilityAttribute.logoUrl || DEFAULT_ICON_URL);

  const renderContent = () => {
    switch (cardStyle) {
      case SustainabilityAttributeCardStyle.SINGLE_STATUS:
        return (
          <AttributeAssuranceSingleStatus sustainabilityAttribute={sustainabilityAttribute} />
        );
      case SustainabilityAttributeCardStyle.GRAPH:
      default:
        return (
          <AttributeAssuranceGraph
            entity={sustainabilityAttribute.level}
            {...processSustainabilityAttribute(sustainabilityAttribute)}
          />
        );
    }
  };

	return (
		<div className="w-full h-auto p-4 rounded-2xl border border-gray-90 flex">
			<div className="w-24 h-24 flex-shrink-0 mr-4">
				<img className="w-full h-full object-cover rounded-lg" src={imgSrc} alt={`Logo for ${sustainabilityAttribute.name}`} onError={() => setImgSrc(DEFAULT_ICON_URL)} />
			</div>
			<div className="flex-grow flex flex-col justify-between min-w-0 overflow-hidden">
				<div className="w-full overflow-hidden">
					<div className="text-tc-primary text-l font-bold truncate" title={sustainabilityAttribute.name}>
						{sustainabilityAttribute.name}
					</div>
				</div>
				{renderContent()}
			</div>
		</div>
	);
};

export const SustainabilityAttributeCard = withErrorBoundary(_SustainabilityAttributeCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SustainabilityAttributeCard: ', error);
	},
});
