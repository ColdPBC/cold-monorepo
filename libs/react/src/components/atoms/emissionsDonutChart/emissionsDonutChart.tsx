import { FootprintDetailChip } from '../footprintDetailChip';
import { ArcElement, Chart as ChartJS, ChartData, ChartOptions, DoughnutController, Plugin as PluginType } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useActiveSegment } from '@coldpbc/hooks';
import { Spinner } from '../spinner';
import clsx from 'clsx';
import { FootprintOverviewHorizontalDetail, FootprintOverviewVerticalDetail } from '../../molecules';
import { HexColors } from '@coldpbc/themes';

const NO_DATA_CHART_DATA = [
	{
		data: [30, 1.9423000000000001, 26, 1.9423000000000001, 60, 1.9423000000000001, 80, 1.9423000000000001],
		borderRadius: 2,
		borderWidth: 0,
		backgroundColor: [HexColors.teal.DEFAULT, '#FFFFFF00', HexColors.green.DEFAULT, '#FFFFFF00', HexColors.purple.DEFAULT, '#FFFFFF00', HexColors.lightblue.DEFAULT, '#FFFFFF00'],
	},
];

ChartJS.register(ArcElement, DoughnutController);

export interface SubCategoryTotal {
	value: number;
	color: string;
	name: string;
	percent?: number;
	subcategoryKey: string;
}

export enum EmissionsDonutChartVariants {
	horizontal = 'horizontal', // horizontal is the default
	vertical = 'vertical',
}

interface Props {
	variant: EmissionsDonutChartVariants;
	totalEmissions?: number;
	isEmptyData?: boolean;
	isLoading?: boolean;
	chartData: ChartData<'doughnut'>;
	subcategoryTotals: SubCategoryTotal[];
	hoverColorArray?: string[];
}

export const EmissionsDonutChart = ({ variant, totalEmissions, isEmptyData, isLoading, chartData, subcategoryTotals, hoverColorArray }: Props) => {
	// account for spacer elements, need to offset index
	const getIndexOffsetForSegment = (index: number) => {
		return index === 0 ? 0 : index + index;
	};

	const { activeSegment, setActiveSegment, animateSegmentThickness, segmentOnHover, chartBeforeDraw } = useActiveSegment({ chartHasSpacers: true });

	const chartOptions: ChartOptions<'doughnut'> = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: 55,
		onHover: segmentOnHover,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore - inject this into the chart options
		activeSegment,
	};

	// Create plugins for chart
	const chartPlugins: PluginType<'doughnut'>[] = [
		{
			id: 'sliceThickness',
			// @ts-expect-error todo: fix type error
			beforeDraw: (chart: ChartJS) => chartBeforeDraw(chart, hoverColorArray ?? []),
		},
	];

	if (isLoading) {
		return (
			<div className="h-[284px] flex items-center">
				<Spinner />
			</div>
		);
	} else if (isEmptyData) {
		return (
			<div className="relative h-[100px] w-full -my-2" data-testid={'footprint-overview-chart'}>
				<svg
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					xmlns="http://www.w3.org/2000/svg"
					width="81"
					height="80"
					viewBox="0 0 81 80"
					fill="none">
					<rect x="38" y="29.5" width="4" height="15" rx="2" fill="white" />
					<rect x="38" y="46.5" width="4" height="4" rx="2" fill="white" />
				</svg>
				<Chart
					options={{
						...chartOptions,
						radius: 40,
						cutout: 35, // Arc should be 30px wide
					}}
					type="doughnut"
					data={{ datasets: NO_DATA_CHART_DATA }}
				/>
			</div>
		);
	}

	const detailViews: JSX.Element[] = [];

	const largestSubcategoryVal = subcategoryTotals.length ? Math.max(...subcategoryTotals.map(s => s.value)) : 0;

	subcategoryTotals.forEach((subcategoryTotal, index) => {
		const leftAlign = detailViews.length < 2;
		const bottomAlign = detailViews.length === 1 || detailViews.length === 2;
		detailViews.push(
			<div
				key={subcategoryTotal.name}
				className={clsx({
					'absolute w-[210px] inline-flex gap-2 items-start': variant === EmissionsDonutChartVariants.horizontal,
					'left-1/2 translate-x-[104px] justify-start': variant === EmissionsDonutChartVariants.horizontal && leftAlign,
					'right-1/2 translate-x-[-104px] justify-end': variant === EmissionsDonutChartVariants.horizontal && !leftAlign,
					'bottom-0': bottomAlign,
				})}
				onMouseEnter={() => {
					animateSegmentThickness(getIndexOffsetForSegment(index), 'legend');
				}}
				onMouseLeave={() => {
					setActiveSegment(null);
				}}>
				{variant === EmissionsDonutChartVariants.horizontal ? (
					<FootprintOverviewHorizontalDetail
						color={subcategoryTotal.color}
						title={subcategoryTotal.name}
						percent={subcategoryTotal.percent ?? 0}
						emissions={subcategoryTotal.value}
						leftAlign={leftAlign}
					/>
				) : (
					<FootprintOverviewVerticalDetail
						color={subcategoryTotal.color}
						title={subcategoryTotal.name}
						percent={subcategoryTotal.percent ?? 0}
						emissions={subcategoryTotal.value}
						percentWidth={subcategoryTotal.value / largestSubcategoryVal}
					/>
				)}
			</div>,
		);
	});

	return (
		<div className="w-full" data-testid={'footprint-overview-chart'}>
			<div
				className={clsx('w-full relative', {
					'h-[255px] mt-2': variant === EmissionsDonutChartVariants.horizontal,
					'h-[190px] -mt-3': variant === EmissionsDonutChartVariants.vertical,
				})}>
				{variant === EmissionsDonutChartVariants.horizontal && detailViews}
				{variant === EmissionsDonutChartVariants.vertical && totalEmissions && <FootprintDetailChip emissions={totalEmissions} large center />}
				<Chart options={chartOptions} type="doughnut" data={chartData} plugins={chartPlugins} data-chromatic="ignore" />
			</div>
			{variant === EmissionsDonutChartVariants.vertical && <div className="max-w-md m-auto -mb-3 mt-2">{detailViews}</div>}
		</div>
	);
};
