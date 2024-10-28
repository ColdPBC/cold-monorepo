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

const getSupplierCounts = (attributeAssurances: Array<{ entity: { supplierName?: string | null } }>) => {
  // First create the grouped object
  const groupedSuppliers = attributeAssurances
    .filter(assurance => assurance.entity.supplierName != null)
    .reduce((acc, assurance) => {
      const supplierName = assurance.entity.supplierName as string;
      acc[supplierName] = (acc[supplierName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Then convert to array and map to final format
  return Object.entries(groupedSuppliers)
    .map(([supplierName, count]) => `${supplierName} (${count})`);
};

const _AttributeAssuranceEntityDetail: React.FC<AttributeAssuranceEntityDetailProps> = ({ sustainabilityAttribute, expanded, onClick }) => {
	const attributeAssurances = sustainabilityAttribute.attributeAssurances;
	const totalEntities = attributeAssurances.length;
	const pluralizedEntities = pluralize(toLower(EntityLevel[sustainabilityAttribute.level]), totalEntities);

	let subheader: string | null;
  let bubbleLabels: string[];

	switch (sustainabilityAttribute.level) {
		case EntityLevel.SUPPLIER:
			subheader = `Associated with ${pluralizedEntities} in this supply chain.`;
      bubbleLabels = attributeAssurances.map(attributeAssurance => attributeAssurance.entity.name)
			break;
		case EntityLevel.MATERIAL:
			subheader = `Associated with ${pluralizedEntities} used in this product.`;
      bubbleLabels = getSupplierCounts(sustainabilityAttribute.attributeAssurances);
			break;
		default:
			subheader = null;
      bubbleLabels = [];
	}

	return (
    <>
    <span className="text-tc-primary text-body">{subheader}</span>
    <div className="relative w-full flex items-center">
      <div className="w-[calc(100%-24px)]"> {/* Subtract space for chevron */}
        <BubbleList values={bubbleLabels} />
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

