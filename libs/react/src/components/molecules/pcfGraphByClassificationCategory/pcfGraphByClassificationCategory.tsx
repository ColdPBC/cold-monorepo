import React from 'react';
import { PcfGraphData } from '@coldpbc/interfaces';
import { MATERIAL_CLASSIFICATIONS_CATEGORY_COLORS } from '@coldpbc/lib';

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
	data: PcfGraphData[];
	displayStyle: 'pcfTab' | 'productDetails';
}

export const PcfGraphByClassificationCategory: React.FC<PcfGraphByClassificationCategoryProps> = ({ data, displayStyle }) => {
	const sortedData = data.sort((a, b) => b.emissions - a.emissions);
	const totalEmissions = data.reduce((sum, datum) => datum.emissions + sum, 0);

	if (sortedData.length === 0 || totalEmissions <= 0) {
		return null;
	}

	return (
		<div className={'h-fit w-full'}>
			{/* Graph */}
			<div className="h-fit w-full flex rounded-lg gap-[2px] overflow-hidden">
				{sortedData.map(datum => (
					<div
						style={{
							backgroundColor: MATERIAL_CLASSIFICATIONS_CATEGORY_COLORS[datum.classificationCategory],
							width: `${(datum.emissions / totalEmissions) * 100}%`,
							height: styles[displayStyle].graphHeight,
						}}
					/>
				))}
			</div>
			{/* Labels */}
			<div className="flex flex-wrap items-start gap-x-6 gap-y-1 text-label text-tc-secondary" style={{ paddingTop: styles[displayStyle].padding }}>
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
