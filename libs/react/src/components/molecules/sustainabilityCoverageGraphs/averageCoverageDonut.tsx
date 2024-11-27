import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { HexColors } from '@coldpbc/themes';

interface AverageCoverageDonutProps {
	percentMaterialHasAttribute: number;
	accentColor: string;
}

const INACTIVE_COLOR = HexColors.bgc.menu;

ChartJS.register(ArcElement, Tooltip);

export const AverageCoverageDonut: React.FC<AverageCoverageDonutProps> = ({ percentMaterialHasAttribute, accentColor }) => {
	const percentDoesNotHave = 100 - percentMaterialHasAttribute;

	const chartData = {
		datasets: [
			{
				data: [percentMaterialHasAttribute, percentDoesNotHave],
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
			{/* Average Coverage percent in center */}
			<div className="absolute inset-0 flex flex-col items-center justify-center text-tc-primary">
				<div className="text-4xl font-bold">{`${percentMaterialHasAttribute}%`}</div>
				<div className="text-body">{'Average by Weight'}</div>
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
					<span className="text-body font-bold">Material has Attribute</span>
					<span>{percentMaterialHasAttribute}%</span>
				</div>
			</div>
			{/* "Does Not Have" Label in Bottom-Right */}
			<div className="absolute w-40 bottom-4 left-4 text-tc-primary flex gap-2 justify-end">
				<div className="flex flex-col items-end gap-1">
					<span className="text-body font-bold">Material does not</span>
					<span>{percentDoesNotHave}%</span>
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
