import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, ChartData, ChartOptions, PieController, Plugin as PluginType } from 'chart.js';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { Spinner } from '../../atoms/spinner/spinner';
import { Table } from 'flowbite-react';
import { FootprintDetailChip } from '../../atoms/footprintDetailChip/footprintDetailChip';
import { useActiveSegment } from '../../../hooks/useActiveSegment';
import { darkTableTheme } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useOrgSWR } from '../../../hooks/useOrgSWR';
import { map } from 'lodash';
import { ErrorType } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';
import { formatTonnes } from '../../../lib/footprintUtils';

interface LegendRow {
	value: number;
	color: string;
	name: string;
	percent?: number;
}

interface Props {
	colors: string[];
	subcategory_key: string;
	period: number;
	setIsEmpty?: (isEmpty: boolean) => void;
}

ChartJS.register(ArcElement, PieController);

function _FootprintDetailChart({ colors, subcategory_key, period, setIsEmpty }: Props) {
	const chartRef = useRef<ChartJS<'pie'>>(null);

	const { activeSegment, setActiveSegment, animateSegmentThickness, segmentOnHover, chartBeforeDraw } = useActiveSegment({ chartHasSpacers: false });

	const [chartData, setChartData] = useState<ChartData<'pie'>>({
		datasets: [
			{
				data: [],
			},
		],
	});

	const [legendRows, setLegendRows] = useState<LegendRow[]>([]);
	const [totalFootprint, setTotalFootprint] = useState(0);

	// Get footprint data from SWR
	const { data, error, isLoading } = useOrgSWR<any>(['/categories/company_decarbonization', 'GET'], axiosFetcher);
	const { logError } = useColdContext();

	if (error) {
		logError(error, ErrorType.SWRError);
		return null;
	}

	const isEmpty =
		!isLoading &&
		(!data?.subcategories?.[subcategory_key] ||
			!Object.keys(data?.subcategories?.[subcategory_key].activities).some(activityKey => {
				const activity = data?.subcategories?.[subcategory_key].activities[activityKey];

				return activity.footprint && activity.footprint.value !== null;
			}));

	// Update chart data on receiving new data
	// todo: fix react-hooks/rules-of-hooks
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (setIsEmpty) setIsEmpty(isEmpty);
		if (isEmpty) return;

		const newData: { name: string; footprint: number }[] = [];
		let newTotalFootprint = 0;
		const newLegendRows: LegendRow[] = [];

		// Transform chart data
		Object.keys(data?.subcategories[subcategory_key].activities ?? {}).forEach((activityKey: any) => {
			const activity = data?.subcategories[subcategory_key].activities[activityKey];
			const activityFootprint = activity.footprint?.[period]?.value ?? 0;

			if (activityFootprint > 0) {
				newData.push({
					name: activity.activity_name,
					footprint: activityFootprint,
				});
				newTotalFootprint += activityFootprint;
			}
		});

		// Populate legend rows
		newData
			.sort((a, b) => b.footprint - a.footprint)
			.forEach((nD, i) => {
				newLegendRows.push({
					value: nD.footprint,
					color: colors[i],
					name: nD.name,
					percent: Math.round((nD.footprint / newTotalFootprint) * 100),
				});
			});

		const backgroundColors = newData.map((_, i) => colors[i]);

		const newChartData: ChartData<'pie'> = {
			datasets: [
				{
					data: map(newData, 'footprint'),
					backgroundColor: backgroundColors,
					borderColor: backgroundColors,
					borderWidth: 1,
					hoverBackgroundColor: backgroundColors,
				},
			],
			labels: map(newData, 'name'),
		};

		const chart = chartRef.current;

		if (!chart) {
			return;
		}

		setChartData(newChartData);
		setTotalFootprint(newTotalFootprint);
		setLegendRows(newLegendRows);
	}, [data, chartRef.current]);

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

	if (isLoading) {
		return (
			<div className="h-[284px] flex items-center">
				<Spinner />
			</div>
		);
	} else if (isEmpty) {
		return null;
	} else if (error) {
		return null;
	}

	return (
		<div className="relative w-full flex items-center">
			<div
				className="h-[182px] w-[182px] relative ml-2 mr-6"
				onMouseLeave={() => {
					setActiveSegment(null);
				}}>
				<Chart ref={chartRef} options={chartOptions} type="pie" data={chartData} plugins={chartPlugins} />
				<FootprintDetailChip emissions={totalFootprint} large center />
			</div>
			<Table
				className="text-white"
				theme={darkTableTheme.table}
				onMouseLeave={() => {
					setActiveSegment(null);
				}}
				data-testid={'footprint-detail-chart-table'}>
				<Table.Head className="text-white normal-case">
					<Table.HeadCell theme={darkTableTheme.table?.head?.cell}>Category</Table.HeadCell>
					<Table.HeadCell theme={darkTableTheme.table?.head?.cell}>Breakdown</Table.HeadCell>
					<Table.HeadCell theme={darkTableTheme.table?.head?.cell}>tCO2e</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{legendRows.map((row, i) => (
						<Table.Row
							key={`${row.name}-${i}`}
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
										background: row.color,
										border: '2px solid rgba(0, 0, 0, 0.2)',
									}}
									className="mr-2 h-[10px] w-[10px] min-w-[10px] rounded-xl"
								/>
								{row.name}
							</Table.Cell>
							<Table.Cell theme={darkTableTheme.table?.body?.cell}>{row.percent}%</Table.Cell>
							<Table.Cell theme={darkTableTheme.table?.body?.cell}>{formatTonnes(row.value)}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}

export const FootprintDetailChart = withErrorBoundary(_FootprintDetailChart, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in FootprintDetailChart: ', error);
	},
});
