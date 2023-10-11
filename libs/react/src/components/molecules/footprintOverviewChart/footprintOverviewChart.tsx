import { PropsWithChildren } from 'react';
import {
  ChartData,
} from 'chart.js';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { footprintSubcategoryColors, HexColors } from '@coldpbc/themes';
import { forEach, isArray, some} from 'lodash';
import { EmissionsDonutChart, EmissionsDonutChartVariants, SubCategoryTotal } from '../../atoms/emissionsDonutChart/emissionsDonutChart';

const MAX_CATEGORIES = 4;

export interface FootprintOverviewDetail {
  color: string;
  title: string;
  percent: number;
  emissions: number;
}

export interface FootprintOverviewChartProps {
  variant?: EmissionsDonutChartVariants;
  period: number | string;
  periodType?: string; // year should be the default
}

const gapStylingConstant = 100;

export function FootprintOverviewChart(
  props: PropsWithChildren<FootprintOverviewChartProps>,
) {

  const {
    variant = EmissionsDonutChartVariants.horizontal,
    period,
  } = props;

  // Get footprint data from SWR
  const { data, isLoading } = useSWR<any>(
    ['/categories/company_decarbonization', 'GET'],
    axiosFetcher,
  );

  if (!data) return null;

  const isEmptyFootprintData = !isLoading && !some(data?.subcategories, (
    (subcategory: any) => some(subcategory.activities, (
        (activity: any) => activity.footprint && activity.footprint?.[props.period]?.value !== null ))));

  // Add up all the information from the footprint
  const subcategoryTotals: SubCategoryTotal[] = [];
  let totalFootprint = 0;
  Object.keys(data?.subcategories ?? {}).forEach((subcategoryKey) => {
    const subcategory = data.subcategories[subcategoryKey];
    let value = 0;
    const color = HexColors[footprintSubcategoryColors[subcategoryKey]]?.DEFAULT || HexColors.primary.DEFAULT;

    let nullFootprint = true;

    if (subcategory?.activities) {
      forEach(subcategory.activities, (activity) => {
        if (activity?.footprint && period in activity.footprint) {
          const footprint = activity.footprint[period];
          if (footprint && footprint.value !== null) {
            value += footprint.value;
            totalFootprint += footprint.value;
            nullFootprint = false;
          }
        }
      })
    }
    if (subcategoryTotals.length >= MAX_CATEGORIES) return;
    if (!nullFootprint)
      subcategoryTotals.push({value: value, color, name: subcategory.subcategory_name, subcategoryKey});
  });

  // Set spacer width
  const spacerValue = totalFootprint / gapStylingConstant;

  // Reset the chart data
  const chartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [],
        borderRadius: 2,
        borderWidth: 0,
        backgroundColor: [],
      },
    ],
    labels: [],
  };

  // Add data to the chart, determine total percentages
  forEach(subcategoryTotals.sort((a, b) => b.value - a.value), (info, index) => {
    info.percent = (info.value / totalFootprint) * 100;

    chartData.labels?.push(info.name);
    chartData.datasets[0].data.push(info.value);

    if (isArray(chartData.datasets[0].backgroundColor)) {
      chartData.datasets[0].backgroundColor?.push(info.color);
    }

    // Add a spacer
    chartData.labels?.push(null);
    chartData.datasets[0].data.push(spacerValue);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    chartData.datasets[0].backgroundColor?.push('#FFFFFF00'); // make spacer transparent
  });

  return (
    <EmissionsDonutChart
      variant={variant}
      isEmptyData={isEmptyFootprintData}
      totalEmissions={totalFootprint}
      chartData={chartData}
      subcategoryTotals={subcategoryTotals}
      hoverColorArray={subcategoryTotals.sort((a, b) => b.value - a.value).map((subcategory) => {
        return HexColors[footprintSubcategoryColors[subcategory.subcategoryKey]]?.DEFAULT_BRIGHTEN || HexColors.primary.DEFAULT
      })}
    />
  );
}
