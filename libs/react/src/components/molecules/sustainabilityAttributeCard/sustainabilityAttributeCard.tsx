import React, { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import {
  AttributeAssuranceEntityDetail,
  AttributeAssuranceGraph,
  AttributeAssuranceSingleStatus, SustainabilityCardExpandedView,
} from '@coldpbc/components';
import { SustainabilityAttribute } from '@coldpbc/interfaces';

interface SustainabilityAttributeCardProps {
  sustainabilityAttribute: SustainabilityAttribute;
  cardStyle?: SustainabilityAttributeCardStyle;
}

export enum SustainabilityAttributeCardStyle {
  ENTITY_DETAIL = 'ENTITY DETAIL',
  GRAPH = 'GRAPH',
  SINGLE_STATUS = 'SINGLE STATUS',
}

export const DEFAULT_ICON_URL = 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/NoImage.png';

const _SustainabilityAttributeCard: React.FC<SustainabilityAttributeCardProps> = ({ sustainabilityAttribute, cardStyle }) => {
	// If we don't get a logo image from the backend, we'll use the default
	const [imgSrc, setImgSrc] = useState<string>(sustainabilityAttribute.logoUrl || DEFAULT_ICON_URL);
  const [expanded, setExpanded] = useState<boolean>(false);

  const renderContent = () => {
    switch (cardStyle) {
      case SustainabilityAttributeCardStyle.ENTITY_DETAIL:
        return (
          <AttributeAssuranceEntityDetail
            sustainabilityAttribute={sustainabilityAttribute}
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          />
        );
      case SustainabilityAttributeCardStyle.SINGLE_STATUS:
        return (
          <AttributeAssuranceSingleStatus sustainabilityAttribute={sustainabilityAttribute} />
        );
      case SustainabilityAttributeCardStyle.GRAPH:
      default:
        return (
          <AttributeAssuranceGraph sustainabilityAttribute={sustainabilityAttribute} />
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
      {cardStyle === SustainabilityAttributeCardStyle.ENTITY_DETAIL && expanded && (
        <SustainabilityCardExpandedView sustainabilityAttribute={sustainabilityAttribute} />
      )}
		</div>
	);
};

export const SustainabilityAttributeCard = withErrorBoundary(_SustainabilityAttributeCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SustainabilityAttributeCard: ', error);
	},
});
