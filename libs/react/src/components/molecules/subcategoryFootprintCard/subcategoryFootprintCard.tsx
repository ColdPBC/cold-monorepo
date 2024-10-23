import { EmissionsDonutChart, EmissionsDonutChartVariants, ErrorFallback, SubCategoryTotal } from '@coldpbc/components';
import { Card } from '../card';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useEffect, useState } from 'react';
import { ChartData } from 'chart.js';
import { footprintSubcategoryColors, getSchemeForColor, HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorType } from '@coldpbc/enums';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';

interface Props {
	variant?: EmissionsDonutChartVariants;
	period: number | string;
	periodType?: string; // year should be the default
	subcategory_key: string;
}

const gapStylingConstant = 100;

const _SubcategoryFootprintCard = ({ variant = EmissionsDonutChartVariants.vertical, period, subcategory_key }: Props) => {
	const [chartData, setChartData] = useState<ChartData<'doughnut'>>({
		datasets: [
			{
				data: [],
			},
		],
	});

	const [totalFootprint, setTotalFootprint] = useState(0);
	const [subcategoryTotals, setSubcategoryTotals] = useState<SubCategoryTotal[]>([]);

	const { data, error, isLoading } = useOrgSWR<any>(['/categories/company_decarbonization', 'GET'], axiosFetcher);
	const { logError } = useColdContext();

	const colors = getSchemeForColor(HexColors[footprintSubcategoryColors[subcategory_key]]);

	if (error) {
		logError(error, ErrorType.SWRError);
		return null;
	}

	const subcategoryData = data?.subcategories?.[subcategory_key];

	const isEmpty =
		!isLoading &&
		(!subcategoryData ||
			!Object.keys(subcategoryData.activities).some(activityKey => {
				const activity = subcategoryData.activities[activityKey];

				return activity.footprint && activity.footprint.value !== null;
			}));

	// Update chart data on receiving new data
	useEffect(() => {
		if (isEmpty) return;

		const newLabels: (string | null)[] = [];
		const backgroundColor: string[] = [];
		const newData: number[] = [];
		let newSubcategoryTotals: SubCategoryTotal[] = [];

		let newTotalFootprint = 0;

		// Transform chart data
		Object.keys(data?.subcategories[subcategory_key].activities ?? {}).forEach((activityKey: any, index) => {
			const activity = data?.subcategories[subcategory_key].activities[activityKey];
			const activityFootprint: number = activity.footprint?.[period]?.value ?? 0;

			if (activityFootprint > 0) {
				newTotalFootprint += activityFootprint;
				newSubcategoryTotals.push({
					value: activityFootprint,
					color: colors[index],
					name: activity.activity_name,
					subcategoryKey: subcategory_key,
				});
			}
		});

		// Set spacer width
		const spacerValue = newTotalFootprint / gapStylingConstant;

		newSubcategoryTotals = newSubcategoryTotals.sort((a, b) => b.value - a.value);

		newSubcategoryTotals.forEach((sT, index) => {
			// Add percent of total footprint to each category
			newSubcategoryTotals[index] = {
				...sT,
				percent: (sT.value / newTotalFootprint) * 100,
				color: colors[index],
			};

			newLabels.push(sT.name);
			newData.push(sT.value);
			backgroundColor.push(colors[index]);

			// Add a spacer to chart
			newLabels.push(null);
			newData.push(spacerValue);
			backgroundColor.push('#FFFFFF00'); // make spacer transparent
		});

		const newChartData: ChartData<'doughnut'> = {
			datasets: [
				{
					data: newData,
					backgroundColor,
					borderColor: backgroundColor,
					borderWidth: 1,
					hoverBackgroundColor: backgroundColor,
				},
			],
			labels: newLabels,
		};

		setChartData(newChartData);
		setSubcategoryTotals(newSubcategoryTotals);
		setTotalFootprint(newTotalFootprint);
	}, [data, subcategory_key]);

	if (isEmpty) {
		return null;
	}

	const subcategoryName = subcategoryData?.subcategory_name;

	return (
		<Card title={`${period} ${subcategoryName} Footprint`} data-testid={`subcategory-footprint-card-${subcategory_key}`}>
			<EmissionsDonutChart
				variant={variant}
				isEmptyData={isEmpty}
				totalEmissions={totalFootprint}
				chartData={chartData}
				subcategoryTotals={subcategoryTotals}
				hoverColorArray={colors}
				// key changes will force a chart redraw
				key={subcategory_key}
			/>
		</Card>
	);
};

export const SubcategoryFootprintCard = withErrorBoundary(_SubcategoryFootprintCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SubcategoryFootprintCard: ', error);
	},
});
