import { AttributeAssuranceStatusLabel, BubbleList, ColdIcon, ErrorFallback } from '@coldpbc/components';
import React from 'react';
import { SustainabilityAttribute, SustainabilityAttributeAssurance } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { format } from 'date-fns';
import { AttributeAssuranceStatus, EntityLevel, IconNames } from '@coldpbc/enums';
import { pluralize, toSentenceCase } from '@coldpbc/lib';
import { toLower } from 'lodash';

interface AttributeAssuranceEntityDetailProps {
  sustainabilityAttribute: SustainabilityAttribute;
  expanded: boolean;
  onClick: () => void;
}

const _AttributeAssuranceEntityDetail: React.FC<AttributeAssuranceEntityDetailProps> = ({ sustainabilityAttribute, expanded, onClick }) => {
	const attributeAssurances = sustainabilityAttribute.attributeAssurances;
	const totalEntities = attributeAssurances.length;
	const pluralizedEntities = pluralize(toLower(EntityLevel[sustainabilityAttribute.level]), totalEntities);

	let subheader: string | null;

	switch (sustainabilityAttribute.level) {
		case EntityLevel.SUPPLIER:
			subheader = `Associated with ${pluralizedEntities} in this supply chain.`;
			break;
		case EntityLevel.MATERIAL:
			subheader = `Associated with ${pluralizedEntities} used in this product.`;
			break;
		default:
			subheader = null;
	}

	return (
    <>
    <span className="text-tc-primary text-body">{subheader}</span>
    <div className="relative w-full flex items-center">
      <div className="w-[calc(100%-24px)]"> {/* Subtract space for chevron */}
        <BubbleList values={attributeAssurances.map(attributeAssurance => attributeAssurance.entity.name)} />
      </div>
      <div className="absolute right-0 flex items-center h-full py-2 px-2">
        <ColdIcon name={expanded ? IconNames.ColdChevronUpIcon : IconNames.ColdChevronDownIcon} onClick={onClick} />
      </div>
    </div>
</>
)
  ;
};

export const AttributeAssuranceEntityDetail = withErrorBoundary(_AttributeAssuranceEntityDetail, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, _info) => {
    console.error('Error occurred in AttributeAssuranceEntityDetail: ', error);
  },
});

