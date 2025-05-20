import React, { useState, useRef, useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import {
  AttributeAssuranceCountGraph,
  AttributeAssuranceEntityDetail,
  AttributeAssuranceSingleStatus, BaseButton,
  SustainabilityCardExpandedView,
} from '@coldpbc/components';
import { SustainabilityAttribute } from '@coldpbc/interfaces';
import {ButtonTypes, EntityLevel} from '@coldpbc/enums';
import {useNavigate} from "react-router-dom";

interface SustainabilityAttributeCardProps {
  sustainabilityAttribute: SustainabilityAttribute;
  cardStyle?: SustainabilityAttributeCardStyle;
  displayedOnEntityLevel?: EntityLevel;
  isNavigable?: boolean;
}

export enum SustainabilityAttributeCardStyle {
  ENTITY_DETAIL = 'ENTITY DETAIL',
  GRAPH = 'GRAPH',
  SINGLE_STATUS = 'SINGLE STATUS',
}

export const DEFAULT_ICON_URL = 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/NoImage.png';

const _SustainabilityAttributeCard: React.FC<SustainabilityAttributeCardProps> = ({ sustainabilityAttribute, cardStyle, displayedOnEntityLevel, isNavigable }) => {

  // If we don't get a logo image from the backend, we'll use the default
	const [imgSrc, setImgSrc] = useState<string>(sustainabilityAttribute.logoUrl || DEFAULT_ICON_URL);
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const expandedContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isExpanded && expandedContentRef.current) {
      // Wait a frame for the DataGrid to render
      requestAnimationFrame(() => {
        expandedContentRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      });
    }
  }, [isExpanded]);

  const renderContent = () => {
    switch (cardStyle) {
      case SustainabilityAttributeCardStyle.ENTITY_DETAIL:
        return (
          <AttributeAssuranceEntityDetail
            sustainabilityAttribute={sustainabilityAttribute}
            displayedOnEntityLevel={displayedOnEntityLevel || EntityLevel.PRODUCT}
            expanded={isExpanded}
            onClick={() => setExpanded(!isExpanded)}
          />
        );
      case SustainabilityAttributeCardStyle.SINGLE_STATUS:
        return (
          <AttributeAssuranceSingleStatus sustainabilityAttribute={sustainabilityAttribute} />
        );
      case SustainabilityAttributeCardStyle.GRAPH:
      default:
        return (
          <AttributeAssuranceCountGraph sustainabilityAttribute={sustainabilityAttribute} />
        );
    }
  };

	return (
		<div>
      <div className={`w-full h-auto p-4 ${isExpanded ? 'rounded-t-2xl' : 'rounded-2xl'} border border-gray-90 flex flex-col`}>
        <div className="flex">
          <div className="w-24 h-24 flex-shrink-0 mr-4">
            <img className="w-full h-full object-cover rounded-lg" src={imgSrc} alt={`Logo for ${sustainabilityAttribute.name}`} onError={() => setImgSrc(DEFAULT_ICON_URL)} />
          </div>
          <div className="flex-grow flex flex-col justify-between min-w-0 overflow-hidden">
            <div className="flex flex-row gap-2 w-full overflow-hidden justify-between">
              <div className="text-tc-primary text-l font-bold truncate" title={sustainabilityAttribute.name}>
                {sustainabilityAttribute.name}
              </div>
              {
                isNavigable && [SustainabilityAttributeCardStyle.SINGLE_STATUS, SustainabilityAttributeCardStyle.ENTITY_DETAIL].includes(cardStyle || SustainabilityAttributeCardStyle.ENTITY_DETAIL) && (
                  <BaseButton
                    data-testid={'button_see_details_sustainability_attribute'}
                    label={'View Details'}
                    onClick={() => {
                      navigate(`/sustainability_claims/${sustainabilityAttribute.id}`);
                    }}
                    variant={ButtonTypes.secondary}
                    className={'flex-none'}
                  />
                )
              }
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
      {cardStyle === SustainabilityAttributeCardStyle.ENTITY_DETAIL && isExpanded && (
        <div ref={expandedContentRef}>
          <SustainabilityCardExpandedView
            sustainabilityAttribute={sustainabilityAttribute}
            displayedOnEntityLevel={displayedOnEntityLevel}
          />
        </div>
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
