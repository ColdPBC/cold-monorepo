import React from 'react';
import { EntityLevel, IconNames } from '@coldpbc/enums';
import { ColdIcon, Popover } from '@coldpbc/components';
import { pluralize, toSentenceCase, processSustainabilityAttributeForGraph } from '@coldpbc/lib';
import { SustainabilityAttribute } from '@coldpbc/interfaces';

interface AttributeAssuranceStatusGraphProps {
  sustainabilityAttribute: SustainabilityAttribute;
  showHeader?: boolean;
}

export const AttributeAssuranceStatusGraph: React.FC<AttributeAssuranceStatusGraphProps> = ({
  sustainabilityAttribute,
  showHeader = true,
}) => {
  const { activeCount, inactiveCount, notDocumentedCount } = processSustainabilityAttributeForGraph(sustainabilityAttribute)

  const total = activeCount + inactiveCount + notDocumentedCount;
  const documentedCount = activeCount + inactiveCount;

  const activePercentage = (activeCount / total) * 100;
  const expiredPercentage = (inactiveCount / total) * 100;
  const notDocumentedPercentage = (notDocumentedCount / total) * 100;

  return (
    <>
      {showHeader ? (
        <div className="flex justify-between items-baseline">
          <p className={`text-sm ${total > 0 ? 'text-white' : 'text-tc-disabled'}`}>
            {pluralize(toSentenceCase(EntityLevel[sustainabilityAttribute.level]), total)}
          </p>
          {total > 0 && (
            <p className="text-sm text-tc-disabled">
              {documentedCount}/{total} Documented
            </p>
          )}
        </div>
      ) : null }

      {total > 0 ? (
        <div>
          <div className="h-1 w-full flex rounded-full overflow-hidden">
            <div className="bg-green-200" style={{ width: `${activePercentage}%` }} />
            <div className="bg-gray-400" style={{ width: `${expiredPercentage}%` }} />
            <div className="bg-red-400" style={{ width: `${notDocumentedPercentage}%` }} />
          </div>

          <div className="flex items-start justify-items-center text-label text-cold-secondary mt-1 gap-4">
						<div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-200 mr-1" />
              <span>{activePercentage.toFixed(0)}% Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-gray-400 mr-1" />
              <span>{expiredPercentage.toFixed(0)}% Inactive</span>
              <Popover content="Expired or missing expiration dates">
                <ColdIcon name={IconNames.ColdInfoIcon} color="CurrentColor" />
              </Popover>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-400 mr-1" />
              <span>{notDocumentedPercentage.toFixed(0)}% No Assurance</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
