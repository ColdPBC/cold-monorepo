import React, { useContext, useEffect, useRef, useState } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import {
	ActiveElement,
	BarController,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	ChartData,
	ChartEvent,
	ChartOptions,
	ChartTypeRegistry,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	TooltipItem,
} from 'chart.js';
import { createGradient, defaultChartData, ErrorFallback } from '@coldpbc/components';
import { forEach, get } from 'lodash';
import { HexColors } from '@coldpbc/themes';
import { Chart } from 'react-chartjs-2';
import opacity from 'hex-color-opacity';
import { Plugin as PluginType } from 'chart.js/dist/types';
import numeral from 'numeral';
import { withErrorBoundary } from 'react-error-boundary';

const _PreviewSpiderChart = (props: { selectedRow: null | string; setSelectedRow: (selectedRow: null | string) => void }) => {
	const { selectedRow, setSelectedRow } = props;
	const { data } = useContext(ColdComplianceManagerContext);
	const { complianceCounts } = data;

	const chartRef = useRef<ChartJS>(null);

	const [chartOptions, setChartOptions] = useState<ChartOptions>({});
	const [chartData, setChartData] = useState<ChartData>(defaultChartData);

	const sectionGroups = get(complianceCounts, 'data.compliance_section_groups', [])
		.filter(group => group.max_score !== 0)
		.sort((a, b) => a.order - b.order)
		.sort((a, b) => a.title.localeCompare(b.title));

	// Handle empty state
	const isEmpty = sectionGroups.length === 0;

	// normalize all the data
	useEffect(() => {
		if (!isEmpty) {
			const newLabels: string[] = [],
				newData: number[] = [],
				aiData: number[] = [],
				maxData: number[] = [];

			// Transform chart data
			forEach(sectionGroups, group => {
				if (group.max_score !== 0) {
					newLabels.push(group.title);
					newData.push((group.score / group.max_score) * 100);
					aiData.push((group.estimated_score / group.max_score) * 100);
					maxData.push(100);
				}
			});

			const chart = chartRef.current;

			const newChartData: ChartData = {
				datasets: [
					{
						data: newData,
						backgroundColor: createGradient(chart?.ctx, chart?.chartArea, HexColors.white + '00', HexColors.green['200'] + '40'),
						borderColor: HexColors.green['200'],
						borderWidth: 2,
						pointRadius: 4,
						pointBackgroundColor: 'transparent',
						pointBorderColor: 'transparent',
						pointHoverBackgroundColor: HexColors.green['200'],
						pointHoverBorderColor: HexColors.green['200'],
					},
					{
						data: aiData,
						backgroundColor: opacity(HexColors.yellow['200'], 0.1),
						borderDash: [2, 3],
						borderColor: HexColors.yellow['200'],
						borderWidth: 2,
						pointRadius: 4,
						pointBackgroundColor: 'transparent',
						pointBorderColor: 'transparent',
						pointHoverBackgroundColor: HexColors.yellow['200'],
						pointHoverBorderColor: HexColors.yellow['200'],
					},
					{
						data: maxData,
						backgroundColor: 'transparent',
						borderColor: 'transparent',
						borderWidth: 2,
						pointRadius: 0,
						pointBackgroundColor: 'transparent',
						pointBorderColor: 'transparent',
						pointHoverBackgroundColor: 'transparent',
						pointHoverBorderColor: 'transparent',
					},
				],
				labels: newLabels,
			};

			if (!chart) {
				return;
			}

			const newChartOptions: ChartOptions = {
				...chartOptions,
				responsive: true,
				maintainAspectRatio: false,
				animation: {
					duration: 800,
					easing: 'easeOutQuint',
				},
				scales: {
					r: {
						animate: true,
						max: 100,
						min: 0,
						suggestedMin: 1,
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
							color: HexColors.gray['90'],
						},
						angleLines: {
							color: HexColors.gray['90'],
						},
					},
				},
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						enabled: true,
						position: 'nearest',
						mode: 'index',
						callbacks: {
							title: (tooltipItems: TooltipItem<keyof ChartTypeRegistry>[]) => {
								// return the title percentage of the first data set data over the section group max score
								// i.e. 80% compliant 4 of 5
								const sectionGroupIndex = tooltipItems[0].dataIndex;
								const sectionGroup = sectionGroups[sectionGroupIndex];
								const score = get(sectionGroup, 'score', 0);
								const maxScore = get(sectionGroup, 'max_score', 0);
								const compliancePercentage = numeral((score / maxScore) * 100).format('0.0');
								return `${compliancePercentage}% compliant\t${score.toFixed(1)} of ${maxScore.toFixed(1)}`;
							},
							label: function (context) {
								// if AI data set, return the AI score ex: 2 points from AI Responses
								// if the data set is the data set, return the score ex: 2 points from Completed Answers
								const sectionGroupIndex = context.dataIndex;
								const sectionGroup = sectionGroups[sectionGroupIndex];
								const score = get(sectionGroup, 'score', 0);
								const aiScore = get(sectionGroup, 'estimated_score', 0);
								const maxScore = get(sectionGroup, 'max_score', 0);
								if (context.datasetIndex === 0) {
									return ` ${score.toFixed(1)} points from Completed Answers`;
								} else if (context.datasetIndex === 1) {
									return ` ${aiScore.toFixed(1)} points from AI Responses`;
								} else {
									return ` ${maxScore.toFixed(1)} points possible`;
								}
							},
							labelColor: function (context) {
								// if the data set is the AI data set, return the AI color
								const colors = [HexColors.green['200'], HexColors.yellow['200'], HexColors.gray['90']];
								return {
									borderColor: colors[context.datasetIndex],
									backgroundColor: colors[context.datasetIndex],
								};
							},
						},
					},
				},
			};

			setChartOptions(newChartOptions);
			setChartData(newChartData);
		}
	}, [chartRef.current, complianceCounts?.data]);

	useEffect(() => {
		// check if selectedRow is not null and if it is a section group title
		if (selectedRow && sectionGroups.find(group => group.title === selectedRow)) {
			const sectionGroupIndex = sectionGroups.findIndex(group => group.title === selectedRow);
			const aiScore = sectionGroups[sectionGroupIndex].estimated_score;
			const score = sectionGroups[sectionGroupIndex].score;
			const dateSetIndex = aiScore > score ? 1 : 0;
			chartRef.current?.tooltip?.setActiveElements(
				[
					{ datasetIndex: 0, index: sectionGroupIndex },
					{ datasetIndex: 1, index: sectionGroupIndex },
					{ datasetIndex: 2, index: sectionGroupIndex },
				],
				{
					x: 0,
					y: 0,
				},
			);
			chartRef.current?.setActiveElements([
				{
					datasetIndex: dateSetIndex,
					index: sectionGroupIndex,
				},
			]);
		} else {
			chartRef.current?.tooltip?.setActiveElements([], {
				x: 0,
				y: 0,
			});
			chartRef.current?.setActiveElements([]);
		}
	}, [selectedRow]);

	if (isEmpty) {
		return null;
	}

	const handleResize = (chart: ChartJS) => {
		setTimeout(() => {
			setChartOptions({
				...chartOptions,
			});
		}, 100);
	};

	const onHover = (event: ChartEvent, elements: ActiveElement[], chart: ChartJS) => {
		if (elements.length > 0) {
			setSelectedRow(sectionGroups[elements[0].index].title);
		} else {
			setSelectedRow(null);
		}
	};

	const chartPlugins: PluginType[] = [Tooltip];

	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, LineController, BarController, Tooltip);

	return (
		<div className="relative h-[500px] w-full flex flex-row justify-center" data-chromatic="ignore" data-testid={'journey-spider-chart'}>
			<Chart
				ref={chartRef}
				options={{
					...chartOptions,
					onResize: handleResize,
					onHover: onHover,
				}}
				type="radar"
				data={chartData}
				plugins={chartPlugins}
			/>
		</div>
	);
};

export const PreviewSpiderChart = withErrorBoundary(_PreviewSpiderChart, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in PreviewSpiderChart: ', error);
	},
});
