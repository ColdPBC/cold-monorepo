import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { EntityLevel } from '@coldpbc/enums';
import { pluralize, toSentenceCase } from '@coldpbc/lib';
import { HexColors } from '@coldpbc/themes';

interface TotalCoverageDonutProps {
  totalEntities: number,
  entitiesWithAttribute: number,
  entityLevel: EntityLevel,
  accentColor: string;
}

const INACTIVE_COLOR = HexColors.bgc.menu;

ChartJS.register(ArcElement, Tooltip);

const entityCountPill = (count: number, level: EntityLevel) => (
	<div className="px-3 bg-bgc-accent rounded-full text-eyebrow inline-flex items-center justify-center self-stretch">
		{pluralize(toSentenceCase(EntityLevel[level]), count)}
	</div>
);

export const TotalCoverageDonut: React.FC<TotalCoverageDonutProps> = ({ totalEntities, entitiesWithAttribute, entityLevel, accentColor }) => {
  const doesNotHave = totalEntities - entitiesWithAttribute;
	const percentage = Math.round((entitiesWithAttribute / totalEntities) * 100);

	const chartData = {
		datasets: [
			{
				data: [entitiesWithAttribute, doesNotHave],
				backgroundColor: [accentColor, INACTIVE_COLOR],
				borderWidth: 0,
				cutout: '85%',
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
		},
	};

	return (
		<div className="relative h-80 w-full">
			<div className="absolute inset-6">
				<Doughnut data={chartData} options={options} />
			</div>
			{/* Entity count in center */}
			<div className="absolute inset-0 flex flex-col items-center justify-center text-tc-primary">
				<div className="text-4xl font-bold">{entitiesWithAttribute}</div>
				<div className="text-body">{`${toSentenceCase(EntityLevel[entityLevel])}${entitiesWithAttribute !== 1 ? 's' : ''} with Attribute`}</div>
			</div>
			{/* "Has Attribute" Label in Top-Left */}
			<div className="absolute w-40 top-4 right-4 text-tc-primary flex gap-2 justify-start">
				<div
					className="w-1 rounded-full self-stretch"
					style={{
						backgroundColor: accentColor,
					}}
				/>
        <div className="flex flex-col items-start gap-1">
          <span className="text-body font-bold">Has Attribute</span>
          <div className="text-body flex gap-1 items-center">
            <span>{percentage}%</span>
            {entityCountPill(entitiesWithAttribute, entityLevel)}
          </div>
        </div>
      </div>
			{/* "Does Not Have" Label in Bottom-Right */}
			<div className="absolute w-40 bottom-4 left-4 text-tc-primary flex gap-2 justify-end">
				<div className="flex flex-col items-end gap-1">
					<span className="text-body font-bold">Does Not Have</span>
					<div className="text-body flex gap-1 items-center">
						{entityCountPill(doesNotHave, entityLevel)}
						<span>{100 - percentage}%</span>
					</div>
				</div>
				<div
					className="w-1 rounded-full self-stretch"
					style={{
						backgroundColor: INACTIVE_COLOR,
					}}
				/>
			</div>
		</div>
	);
};
