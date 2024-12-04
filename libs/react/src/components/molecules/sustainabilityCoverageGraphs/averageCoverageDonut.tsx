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
				<div className="text-body">{'Average Percent by Weight'}</div>
			</div>
		</div>
	);
};
