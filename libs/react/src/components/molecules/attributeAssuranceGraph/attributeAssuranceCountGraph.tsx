import React from 'react';
import { EntityLevel } from '@coldpbc/enums';
import { pluralize, processSustainabilityAttributeForGraph, toSentenceCase } from '@coldpbc/lib';
import { SustainabilityAttribute } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useEntityData } from '@coldpbc/hooks';

interface AttributeAssuranceCountGraphProps {
  sustainabilityAttribute: SustainabilityAttribute;
}

const COLOR_FOR_ENTITY_LEVEL = {
  [EntityLevel.MATERIAL]: 'bg-purple-300',
  [EntityLevel.PRODUCT]: 'bg-lightblue-300',
  [EntityLevel.SUPPLIER]: 'bg-teal-300',
};

export const AttributeAssuranceCountGraph: React.FC<AttributeAssuranceCountGraphProps> = ({ sustainabilityAttribute }) => {
  const { orgId } = useAuth0Wrapper();
  const validLevel = sustainabilityAttribute.level === EntityLevel.ORGANIZATION ? undefined : sustainabilityAttribute.level;
  const entities = useEntityData(validLevel, orgId);
  const totalEntities = entities.length;

  const graphData = processSustainabilityAttributeForGraph(sustainabilityAttribute);
  const documentedCount = graphData.activeCount + graphData.inactiveCount;
  const hasAttributeCount = documentedCount + graphData.notDocumentedCount;

  const hasAttributePercentage = (hasAttributeCount / totalEntities) * 100;
  const doesNotHavePercentage = ((totalEntities - hasAttributeCount) / totalEntities) * 100;

  const accentColor = COLOR_FOR_ENTITY_LEVEL[sustainabilityAttribute.level] || 'bg-lightblue-300';

  return (
		<>
			<div className="flex justify-between items-baseline">
				<p className={`text-sm ${hasAttributeCount > 0 ? 'text-white' : 'text-tc-disabled'}`}>
					{pluralize(toSentenceCase(EntityLevel[sustainabilityAttribute.level]), hasAttributeCount)}
				</p>
				{hasAttributeCount > 0 && (
					<p className="text-sm text-tc-disabled">
						{documentedCount}/{hasAttributeCount} Documented
					</p>
				)}
			</div>

			{totalEntities > 0 && hasAttributeCount > 0 ? (
				<div>
					<div className="h-1 w-full flex rounded-full overflow-hidden">
						<div className={accentColor} style={{ width: `${hasAttributePercentage}%` }} />
						<div className="bg-gray-400" style={{ width: `${doesNotHavePercentage}%` }} />
					</div>

					<div className="flex items-start justify-items-center text-label text-cold-secondary mt-1 gap-4">
						<div className="flex items-center">
							<div className={`w-2 h-2 rounded-full ${accentColor} mr-1`} />
							<span>{`${hasAttributePercentage.toFixed(0)}% of all ${toSentenceCase(EntityLevel[sustainabilityAttribute.level])}s`}</span>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};
