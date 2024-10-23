import { Card, ErrorFallback } from '@coldpbc/components';
import { find, forEach, forOwn, get, isArray, map, reduce, set } from 'lodash';
import {
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
import { Chart } from 'react-chartjs-2';
import React, { useContext } from 'react';
import { ColdEmissionsContext } from '@coldpbc/context';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import opacity from 'hex-color-opacity';
import { Plugin as PluginType } from 'chart.js/dist/types';
import { useColdContext } from '@coldpbc/hooks';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import regression, { DataPoint } from 'regression';
import numeral from 'numeral';

const _EmissionsYearlyCarbonFootprintChart = () => {
	const chartRef = React.useRef(null);
	const { selectedFacility, selectedYear, setSelectedYear, data } = useContext(ColdEmissionsContext);
	// TODO: Fix the issue below!
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { logBrowser } = useColdContext();

	const { emissions, yearOptions } = data;
	const yearsData: {
		[year: string]: {
			total: number;
			[scope: string]: number;
		};
	} = {};
	const defaultScopeColors = [HexColors.lightblue['200'], HexColors.purple['200'], HexColors.teal['200']];

	const yearsChartData: ChartData = {
		labels: Array<string>(),
		datasets: [
			{
				data: Array<number>(),
				backgroundColor: Array<string>(),
				hoverBackgroundColor: HexColors.teal['200'],
				barThickness: 76,
				borderSkipped: false,
				borderRadius: [],
				minBarLength: 10,
				label: 'Scope 3',
			},
			{
				data: Array<number>(),
				backgroundColor: Array<string>(),
				hoverBackgroundColor: HexColors.purple['200'],
				barThickness: 76,
				borderSkipped: false,
				borderRadius: [],
				minBarLength: 10,
				label: 'Scope 2',
			},
			{
				data: Array<number>(),
				backgroundColor: Array<string>(),
				hoverBackgroundColor: HexColors.lightblue['200'],
				barThickness: 76,
				borderRadius: [],
				borderSkipped: false,
				minBarLength: 10,
				label: 'Scope 1',
			},
		],
	};
	const tickColors = Array<string>();
	let maxEmission = 0;
	const regressionData: DataPoint[] = Array<DataPoint>();

	map(emissions, facility => {
		if (selectedFacility.value !== 'all' && selectedFacility.value !== facility.facility_id.toString()) {
			return;
		}
		map(facility.periods, period => {
			const yearEmissions = yearsData[period.value.toString()] || {};
			let yearEmissionsTotal = get(yearEmissions, 'total', 0);
			forEach(['1', '2', '3'], (scope: string) => {
				yearEmissions[scope] = get(yearEmissions, scope, 0);
			});
			map(period.emissions, emission => {
				const scope = emission.scope.ghg_category;
				let scopeEmissions = get(yearEmissions, scope.toString(), 0);
				map(emission.activities, activity => {
					yearEmissionsTotal += activity.tco2e;
					scopeEmissions += activity.tco2e;
				});
				yearEmissions[scope.toString()] = scopeEmissions;
			});
			yearEmissions.total = yearEmissionsTotal;
			yearsData[period.value.toString()] = yearEmissions;
		});
	});

	forOwn(yearsData, (emissions, year) => {
		yearsChartData.labels?.push(year);
		if (selectedYear.value === 'all') {
			tickColors.push('white');
		} else {
			if (year === selectedYear.value) {
				tickColors.push('white');
			} else {
				const lowerOpacityWhite = opacity(HexColors.white, 0.5);
				tickColors.push(lowerOpacityWhite);
			}
		}
		forOwn(emissions, (emission, scope) => {
			if (scope === 'total') {
				return;
			}
			let scopeIndex = 0;
			switch (scope) {
				case '1':
					scopeIndex = 2;
					break;
				case '2':
					scopeIndex = 1;
					break;
				case '3':
					scopeIndex = 0;
					break;
			}
			if (emission === 0) {
				yearsChartData.datasets[scopeIndex].data.push(null);
			} else {
				yearsChartData.datasets[scopeIndex].data.push(emission);
			}
			if (isArray(yearsChartData.datasets[scopeIndex].backgroundColor)) {
				if (selectedYear.value === 'all') {
					// @ts-expect-error - fix this error
					yearsChartData.datasets[scopeIndex].backgroundColor.push(defaultScopeColors[parseInt(scope) - 1]);
				} else {
					if (year === selectedYear.value) {
						// @ts-expect-error - fix this error
						yearsChartData.datasets[scopeIndex].backgroundColor.push(defaultScopeColors[parseInt(scope) - 1]);
					} else {
						// @ts-expect-error - fix this error
						yearsChartData.datasets[scopeIndex].backgroundColor.push(opacity(defaultScopeColors[parseInt(scope) - 1], 0.5));
					}
				}
			}
		});
	});

	forOwn(yearsData, (emissions, year) => {
		// iterate over the scopes and get the total emission for the year
		if (selectedYear.value === 'all') {
			regressionData.push([Object.keys(yearsData).indexOf(year), emissions.total]);
		}
		let totalEmission = 0;
		forOwn(emissions, (emission, scope) => {
			if (scope === 'total') {
				return;
			}
			totalEmission += emission;
		});
		maxEmission = maxEmission < totalEmission ? totalEmission : maxEmission;
	});

	const regressionResult = regression.linear(regressionData);

	if (selectedYear.value === 'all' && Object.keys(yearsData).length > 2) {
		yearsChartData.datasets.push({
			data: map(regressionResult.points, point => {
				return [point[0], point[1]];
			}),
			backgroundColor: HexColors.gray['90'],
			borderColor: HexColors.gray['90'],
			borderWidth: 3,
			type: 'line',
		});
	}

	const chartOptions: ChartOptions = {
		responsive: true,
		backgroundColor: 'transparent',
		elements: {
			point: {
				radius: 0,
			},
		},
		plugins: {
			tooltip: {
				enabled: true,
				position: 'nearest',
				mode: 'index',
				filter: function (tooltipItem) {
					return tooltipItem.datasetIndex !== 3;
				},
				callbacks: {
					title: (tooltipItems: TooltipItem<keyof ChartTypeRegistry>[]) => {
						// return the title for the tooltip 'Year: 2020'
						return `Year: ${tooltipItems[0].label}`;
					},
					label: function (context) {
						return context.dataset.label + ': ' + numeral(context.parsed.y).format('0,0');
					},
				},
			},
			datalabels: {
				color: 'white',
				opacity: context => {
					// change the opacity of the label based on the active state
					if (selectedYear.value === 'all') {
						return 1;
					} else {
						const yearIndex = yearOptions.findIndex(yearOption => yearOption.value === selectedYear.value);
						return context.dataIndex === yearIndex - 1 ? 1 : 0.5;
					}
				},
				align: 'top',
				anchor: 'end',
				formatter: function (value, context) {
					const dataSetArray = Array<number>();
					forEach(context.chart.data.datasets, (dataset, index) => {
						if (selectedYear.value === 'all') {
							if (index < context.chart.data.datasets.length - 1) {
								if (dataset.data[context.dataIndex] !== undefined && dataset.data[context.dataIndex] !== null) {
									dataSetArray.push(dataset.data[context.dataIndex] as number);
								}
							}
						} else {
							if (dataset.data[context.dataIndex] !== undefined && dataset.data[context.dataIndex] !== null) {
								dataSetArray.push(dataset.data[context.dataIndex] as number);
							}
						}
					});
					const total = reduce(dataSetArray, (sum, num) => sum + num, 0);
					const currentDataIndex = context.dataIndex;
					let lastDataSetIndex = 0;
					forEach(context.chart.data.datasets, (dataset, index) => {
						if (context.chart.data.datasets.length === 4 && index === context.chart.data.datasets.length - 1) {
							return;
						}
						if (dataset.data[currentDataIndex] !== undefined && dataset.data[currentDataIndex] !== null) {
							lastDataSetIndex = index;
						}
					});
					if (context.datasetIndex === lastDataSetIndex) {
						return numeral(total).format('0,0');
					} else {
						return '';
					}
				},
			},
		},
		scales: {
			y: {
				ticks: {
					color: 'white',
				},
				grid: {
					color: HexColors.bgc.accent,
				},
				stacked: true,
				suggestedMax: Math.round(maxEmission + (maxEmission > 10 ? maxEmission / 10 : 1)),
			},
			x: {
				ticks: {
					color: tickColors,
				},
				stacked: true,
			},
		},
		onClick(event: ChartEvent, elements) {
			const element = elements[0];
			if (!element) {
				return;
			}
			const index = element.index;
			const yearOption = get(yearOptions, index + 1);
			const allYearsOption = find(yearOptions, { value: 'all' });
			// if the year is already selected, select 'all' option
			if (selectedYear.value === yearOption.value && allYearsOption) {
				setSelectedYear(allYearsOption);
				return;
			} else {
				setSelectedYear(yearOption);
				return;
			}
		},
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore - inject this into the chart options
		selectedYear,
	};

	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, LineController, BarController, Tooltip);

	type BorderRadiusType = {
		topLeft: number;
		topRight: number;
		bottomLeft: number;
		bottomRight: number;
	};
	const barPlugins: PluginType[] = [ChartDataLabels];

	forOwn(yearsData, (emissions, year) => {
		const yearIndex = Object.keys(yearsData).indexOf(year);
		// check all the datasets and get the first and last dataset with data
		const firstDataSetIndex = 0;
		const lastDataSetIndex = 0;
		const specificYearChartData = Array<number>();
		forEach(yearsChartData.datasets, (dataset, index) => {
			if (yearsChartData.datasets.length === 4 && index === yearsChartData.datasets.length - 1) {
				return;
			}
			if (dataset.data[yearIndex] !== undefined && dataset.data[yearIndex] !== null) {
				specificYearChartData.push(index);
			}
		});
		if (specificYearChartData.length === 1) {
			const firstDataSet = yearsChartData.datasets[specificYearChartData[0]];
			const firstBorderRadiuses = get(firstDataSet, 'borderRadius', Array<BorderRadiusType>());
			if (Array.isArray(firstBorderRadiuses)) {
				firstBorderRadiuses.push({
					topLeft: 4,
					topRight: 4,
					bottomLeft: 4,
					bottomRight: 4,
				});
			}
			set(yearsChartData.datasets[firstDataSetIndex], 'borderRadius', firstBorderRadiuses);
		} else {
			const firstDataSet = yearsChartData.datasets[specificYearChartData[0]];
			const lastDataSet = yearsChartData.datasets[specificYearChartData[specificYearChartData.length - 1]];
			const firstBorderRadiuses = get(firstDataSet, 'borderRadius', Array<BorderRadiusType>());
			const lastBorderRadiuses = get(lastDataSet, 'borderRadius', Array<BorderRadiusType>());
			if (Array.isArray(firstBorderRadiuses) && Array.isArray(lastBorderRadiuses)) {
				firstBorderRadiuses.push({
					topLeft: 0,
					topRight: 0,
					bottomLeft: 4,
					bottomRight: 4,
				});
				lastBorderRadiuses.push({
					topLeft: 4,
					topRight: 4,
					bottomLeft: 0,
					bottomRight: 0,
				});
			}
			set(yearsChartData.datasets[lastDataSetIndex], 'borderRadius', lastBorderRadiuses);
			set(yearsChartData.datasets[lastDataSetIndex], 'minBarLength', 5);
			set(yearsChartData.datasets[firstDataSetIndex], 'borderRadius', firstBorderRadiuses);
		}
	});

	const getScopeLegend = (scope: number) => {
		return (
			<div className={'flex flex-row gap-2'}>
				<div className={'w-[29px] h-[23px] rounded-[4px]'} style={{ backgroundColor: defaultScopeColors[scope - 1] }}></div>
				<div className={'text-caption flex items-center'}>Scope {scope}</div>
			</div>
		);
	};

	return (
		<Card glow={false} className={'w-full'}>
			<div className={'w-full flex flex-col gap-[16px]'}>
				<div className={'w-full flex flex-row justify-between'}>
					<div className={'text-h2 text-start'}>Emissions Over Time</div>
				</div>
				<div className={'flex flex-col space-y-4'}>
					<div className={'w-full flex flex-row justify-between'}>
						<div className={'text-left text-caption'}>Tonnes of carbon dioxide equivalents (tCO2e) per year</div>
						<div className={'w-auto flex flex-row gap-[24px]'}>
							{getScopeLegend(1)}
							{getScopeLegend(2)}
							{getScopeLegend(3)}
						</div>
					</div>
					<Chart type={'bar'} className={'w-full'} ref={chartRef} plugins={barPlugins} options={chartOptions} data={yearsChartData} width={'1076px'} height={'400px'} />
				</div>
			</div>
		</Card>
	);
};

export const EmissionsYearlyCarbonFootprintChart = withErrorBoundary(_EmissionsYearlyCarbonFootprintChart, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
