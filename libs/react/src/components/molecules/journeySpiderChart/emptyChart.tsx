import { HexColors } from '@coldpbc/themes';
import { Chart as ChartJS, Filler, LineElement, PointElement, RadarController, RadialLinearScale, Title } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { emptyChartData, options, randomEmptyData } from './constants';
import { Chart } from 'react-chartjs-2';
import { createGradient } from './helpers';

ChartJS.register(RadarController, LineElement, PointElement, RadialLinearScale, Title, Filler);

export const EmptyChart = () => {
	const chartRef = useRef<ChartJS>(null);
	const [chartData, setChartData] = useState(emptyChartData);
	const [chartOptions, setChartOptions] = useState({
		...options,
		elements: {
			line: {
				borderWidth: 3,
				borderColor: '#FFFFFF',
			},
			point: {
				backgroundColor: '#FFFFFF',
				borderColor: '#FFFFFF',
				radius: 1,
			},
		},
	});

	useEffect(() => {
		let mockDataIndex = 0;

		// every 1.2 seconds, cycle through mock data
		const interval = setInterval(() => {
			const newMockDataIndex = mockDataIndex + 1 === randomEmptyData.length ? 0 : mockDataIndex + 1;

			// increment data index
			mockDataIndex = newMockDataIndex;

			setChartData({
				...chartData,
				datasets: [
					{
						data: randomEmptyData[newMockDataIndex],
					},
				],
			});
		}, 1200);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const handleResize = (chart: ChartJS) => {
		setTimeout(() => {
			setChartOptions({
				...chartOptions,
				backgroundColor: createGradient(chart.ctx, chart.chartArea, HexColors.white + '00', HexColors.white + '60'),
			});
		}, 100);
	};

	return (
		<div className="relative h-[150px] w-full" data-chromatic="ignore">
			<Chart
				ref={chartRef}
				options={{
					...chartOptions,
					onResize: handleResize,
				}}
				type="radar"
				data={chartData}
			/>
		</div>
	);
};
