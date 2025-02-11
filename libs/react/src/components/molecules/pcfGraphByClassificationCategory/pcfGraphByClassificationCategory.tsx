import React from 'react';
import { EntityLevel, MaterialClassificationCategory } from '@coldpbc/enums';
import { MATERIAL_CLASSIFICATIONS_CATEGORY_COLORS, pluralize, processSustainabilityAttributeForGraph, toSentenceCase } from '@coldpbc/lib';
import { SustainabilityAttribute } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useEntityData } from '@coldpbc/hooks';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { get } from 'lodash';
import { classificationsByGroup, materialClassificationGroupByAttributeId } from '@coldpbc/components';

interface GraphData {
	classificationCategory: MaterialClassificationCategory;
	emissions: number;
}

const styles = {
  'pcfTab': {
    graphHeight: 43,
    padding: 16,
  },
  'productDetails': {
    graphHeight: 8,
    padding: 8,
  },
}

interface PcfGraphByClassificationCategoryProps {
	data: GraphData[];
	style: 'pcfTab' | 'productDetails';
}

export const PcfGraphByClassificationCategory: React.FC<PcfGraphByClassificationCategoryProps> = ({ data, style }) => {
	const sortedData = data.sort((a, b) => b.emissions - a.emissions);
	const totalEmissions = data.reduce((sum, datum) => datum.emissions + sum, 0);

	if (sortedData.length === 0 || totalEmissions <= 0) {
		return null;
	}

	return (
		<div>
			{/* Graph */}
			<div className="h-fit w-full flex rounded-lg gap-[2px] overflow-hidden">
				{sortedData.map(datum => (
					<div
						style={{
							backgroundColor: MATERIAL_CLASSIFICATIONS_CATEGORY_COLORS[datum.classificationCategory],
							width: `${(datum.emissions / totalEmissions) * 100}%`,
							height: styles[style].graphHeight,
						}}
					/>
				))}
			</div>
			{/* Labels */}
			<div className="flex flex-wrap items-start gap-x-6 gap-y-1 text-label text-tc-secondary" style={{ paddingTop: styles[style].padding }}>
				{sortedData.map(datum => (
					<div className="flex items-center shrink-0">
						<div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: MATERIAL_CLASSIFICATIONS_CATEGORY_COLORS[datum.classificationCategory] }} />
						<span>
							{((datum.emissions / totalEmissions) * 100).toFixed(1)}% {datum.classificationCategory}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};
