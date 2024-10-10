import React from 'react';

interface AttributeAssuranceGraphProps {
  entity: 'MATERIAL' | 'ORGANIZATION' | 'PRODUCT' | 'SUPPLIER';
  activeCount: number;
  expiredCount: number;
  notDocumentedCount: number;
}

function toSentenceCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function pluralize(word: string, count: number) {
  const sentenceCaseWord = toSentenceCase(word);
  return `${count} ${sentenceCaseWord}${count !== 1 ? 's' : ''}`;
}

export const AttributeAssuranceGraph: React.FC<AttributeAssuranceGraphProps> = ({
  entity,
  activeCount,
  expiredCount,
  notDocumentedCount
}) => {
  const total = activeCount + expiredCount + notDocumentedCount;
  const documentedCount = activeCount + expiredCount;

  const activePercentage = (activeCount / total) * 100;
  const expiredPercentage = (expiredCount / total) * 100;
  const notDocumentedPercentage = (notDocumentedCount / total) * 100;

  return (
    <>
      <div className="flex justify-between items-baseline">
        <p className={`text-sm ${total > 0 ? 'text-white' : 'text-tc-disabled'}`}>
          {pluralize(entity, total)}
        </p>
        {total > 0 && (
          <p className="text-sm text-tc-disabled">
            {documentedCount}/{total} Documented
          </p>
        )}
      </div>

      {total > 0 ? (
        <div>
          <div className="h-1 w-full flex rounded-full overflow-hidden">
            <div className="bg-green-200" style={{ width: `${activePercentage}%` }} />
            <div className="bg-gray-400" style={{ width: `${expiredPercentage}%` }} />
            <div className="bg-red-400" style={{ width: `${notDocumentedPercentage}%` }} />
          </div>

          <div className="flex items-start text-xs text-cold-secondary mt-1 gap-4">
						<span className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-200 mr-1" />
              <span>{activePercentage.toFixed(0)}% Active</span>
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-gray-400 mr-1" />
              <span>{expiredPercentage.toFixed(0)}% Expired</span>
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-400 mr-1" />
              <span>{notDocumentedPercentage.toFixed(0)}% No Assurance</span>
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};
