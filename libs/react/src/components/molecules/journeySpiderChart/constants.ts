import { HexColors } from '@coldpbc/themes';
import { ChartData, ChartOptions } from 'chart.js';

export const defaultChartData: ChartData = {
	datasets: [
		{
			data: [],
		},
	],
};

export const emptyChartData: ChartData = {
	datasets: [
		{
			data: [50, 80, 68, 74, 25, 60, 80, 50],
		},
	],
	labels: ['', '', '', '', '', '', '', ''],
};

export const randomEmptyData = [
	[50, 80, 68, 74, 25, 60, 80, 50],
	[64, 50, 40, 73, 63, 61, 54, 67],
	[64, 77, 64, 51, 32, 40, 74, 64],
	[70, 76, 74, 35, 44, 73, 30, 43],
	[75, 71, 36, 32, 36, 60, 64, 67],
	[67, 30, 74, 72, 72, 49, 42, 58],
	[75, 63, 49, 61, 61, 75, 60, 74],
	[30, 70, 55, 77, 59, 52, 36, 50],
	[68, 52, 67, 41, 57, 57, 40, 54],
	[70, 41, 61, 54, 78, 60, 78, 79],
	[52, 49, 67, 36, 72, 39, 68, 75],
];

export const options: ChartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	animation: {
		duration: 800,
		easing: 'easeOutQuint',
	},
	elements: {
		point: {
			radius: 3,
			borderColor: HexColors.white,
			backgroundColor: HexColors.primary.DEFAULT, // this gets overwritten later
		},
		line: {
			borderWidth: 1,
		},
	},
	scales: {
		r: {
			animate: true,
			max: 100, // TODO - normalize this to whatever the value bounds are once we know them
			min: 0,
			ticks: {
				display: false,
				count: 4,
			},
			pointLabels: {
				color: HexColors.tc.primary,
				font: {
					family: "'Inter', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
					size: 12,
					weight: 500,
				},
				padding: 8,
			},
			grid: {
				color: HexColors.bgc.accent,
			},
			angleLines: {
				color: HexColors.bgc.accent,
			},
		},
	},
	plugins: {
		legend: {
			display: false,
		},
	},
};
