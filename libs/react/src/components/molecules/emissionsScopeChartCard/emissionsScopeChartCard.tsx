import React, { useContext, useRef } from 'react';
import { useActiveSegment } from '@coldpbc/hooks';
import { Chart as ChartJS, ChartOptions } from 'chart.js';
import { capitalize, forEach, map, sortBy } from 'lodash';
import { Plugin as PluginType } from 'chart.js/dist/types';
import { Card, ErrorFallback, FootprintDetailChip } from '@coldpbc/components';
import { Chart } from 'react-chartjs-2';
import { Table } from 'flowbite-react';
import { darkTableTheme, getSchemeForColor, HexColors } from '@coldpbc/themes';
import { formatTonnes } from '@coldpbc/lib';
import { ColdEmissionsContext } from '@coldpbc/context';
import { ScopeColors } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';

export interface EmissionsScopeChartCardProps {
	scope_category: number;
}

const _EmissionsScopeChartCard = (props: EmissionsScopeChartCardProps) => {
	const { scope_category } = props;
	const { data, selectedFacility, selectedYear } = useContext(ColdEmissionsContext);
	const { emissions } = data;

	// get all the scope activities and their emissions. also get the total emissions for the scope
	// and the percentage of the total emissions that each activity contributes
	let totalEmissions = 0;
	const scopeActivities: {
		[key: string]: {
			emissions: number;
			percentage: string;
		};
	} = {};

	const colors = getSchemeForColor(HexColors[ScopeColors[scope_category]]);

	const emissionsDataSet = {
		chartData: {
			datasets: [
				{
					data: Array<number>(),
					backgroundColor: Array<string>(),
					borderColor: Array<string>(),
					borderWidth: 1,
					hoverBackgroundColor: Array<string>(),
				},
			],
			labels: Array<string>(),
		},
		tableData: {
			definition: [
				{
					size: 'w-80',
					field: 'activity',
					cellStyle: '',
					headerStyle: '',
					headerTitle: 'Activity',
				},
				{
					size: 'w-80',
					field: 'percentage',
					cellStyle: '',
					headerStyle: '',
					headerTitle: '%',
				},
				{
					size: 'w-32',
					field: 'tCO2e',
					cellStyle: '',
					headerStyle: '',
					headerTitle: 'tcO2e',
				},
			],
			data: Array<{
				activity: string;
				percentage: string;
				tCO2e: number;
			}>(),
		},
	};

	forEach(emissions, facility => {
		if (facility.facility_id.toString() === selectedFacility.value || selectedFacility.value === 'all') {
			forEach(facility.periods, period => {
				if (period.value.toString() !== selectedYear.value && selectedYear.value !== 'all') {
					return;
				}
				forEach(period.emissions, emission => {
					if (emission.scope.ghg_category !== scope_category) {
						return;
					}
					forEach(emission.activities, activity => {
						totalEmissions += activity.tco2e;
						if (scopeActivities[activity.name]) {
							scopeActivities[activity.name].emissions += activity.tco2e;
							scopeActivities[activity.name].percentage = '0%';
						} else {
							scopeActivities[activity.name] = {
								emissions: activity.tco2e,
								percentage: '0%',
							};
						}
					});
				});
			});
		}
	});

	const sortedActivities = sortBy(Object.keys(scopeActivities), activity => {
		return -scopeActivities[activity].emissions;
	});

	forEach(sortedActivities, (activity, index) => {
		const scopeActivity = scopeActivities[activity];
		scopeActivity.percentage = ((scopeActivity.emissions / totalEmissions) * 100).toFixed(1) + '%';
		emissionsDataSet.tableData.data.push({
			activity: activity,
			percentage: scopeActivity.percentage,
			tCO2e: scopeActivity.emissions,
		});
		emissionsDataSet.chartData.datasets[0].data.push(scopeActivity.emissions);
		emissionsDataSet.chartData.datasets[0].backgroundColor.push(colors[index]);
		emissionsDataSet.chartData.datasets[0].hoverBackgroundColor.push(colors[index]);
		emissionsDataSet.chartData.datasets[0].borderColor.push(colors[index]);
		emissionsDataSet.chartData.labels.push(activity);
	});

	const chartRef = useRef<ChartJS<'pie'>>(null);

	const { activeSegment, setActiveSegment, animateSegmentThickness, segmentOnHover, chartBeforeDraw } = useActiveSegment({ chartHasSpacers: false });

	// Create plugins for chart
	const chartPlugins: PluginType<'pie'>[] = [
		{
			id: 'sliceThickness',
			// @ts-expect-error - todo: fix this
			beforeDraw: (chart: ChartJS) => chartBeforeDraw(chart),
		},
	];

	const chartOptions: ChartOptions<'pie'> = {
		responsive: true,
		maintainAspectRatio: false,
		backgroundColor: '#FF0000',
		onHover: segmentOnHover,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore - inject this into the chart options
		activeSegment,
		elements: {
			arc: {
				borderWidth: 0,
			},
		},
	};

	if (!emissionsDataSet.chartData.datasets[0].data.length) {
		return null;
	}

	return (
		<Card title={`Scope ${scope_category}`} className={'w-full'}>
			<div className="relative w-full flex items-center">
				<div
					className="h-[182px] w-[182px] relative ml-2 mr-6"
					onMouseLeave={() => {
						setActiveSegment(null);
					}}>
					<Chart ref={chartRef} options={chartOptions} type="pie" data={emissionsDataSet.chartData} plugins={chartPlugins} />
					<FootprintDetailChip emissions={totalEmissions} large center />
				</div>
				<Table
					className="text-white"
					theme={darkTableTheme.table}
					onMouseLeave={() => {
						setActiveSegment(null);
					}}
					data-testid={'footprint-detail-chart-table'}>
					<Table.Head className="text-white normal-case">
						{map(emissionsDataSet.tableData.definition, (def, i) => (
							<Table.HeadCell key={`${def.field}-${i}`} theme={darkTableTheme.table?.head?.cell}>
								{def.headerTitle}
							</Table.HeadCell>
						))}
					</Table.Head>
					<Table.Body className="divide-y">
						{emissionsDataSet.tableData.data.map((row, i) => (
							<Table.Row
								key={`${row.activity}-${i}`}
								onMouseEnter={() => {
									animateSegmentThickness(i, 'legend');
								}}
								onMouseLeave={() => {
									setActiveSegment(null);
								}}
								theme={darkTableTheme.table?.row}>
								<Table.Cell className="flex items-center font-bold" theme={darkTableTheme.table?.body?.cell}>
									<div
										style={{
											background: colors[i],
											border: '2px solid rgba(0, 0, 0, 0.2)',
										}}
										className="mr-2 h-[10px] w-[10px] min-w-[10px] rounded-xl"
									/>
									<div className={'w-[166px] truncate'}>{capitalize(row.activity)}</div>
								</Table.Cell>
								<Table.Cell theme={darkTableTheme.table?.body?.cell}>{row.percentage}</Table.Cell>
								<Table.Cell theme={darkTableTheme.table?.body?.cell}>{formatTonnes(row.tCO2e)}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>
		</Card>
	);
};

export const EmissionsScopeChartCard = withErrorBoundary(_EmissionsScopeChartCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
