import { ArcElement, Chart as ChartJS, ChartData, ChartOptions, DoughnutController, Plugin as PluginType } from 'chart.js';
import { Chart } from 'react-chartjs-2';
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

interface SubCategoryTotal {
  value: number;
  color: string;
  name: string;
  percent?: number;
  subcategoryKey: string;
}

enum EmissionsDonutChartVariants {
  horizontal = 'horizontal', // horizontal is the default
  vertical = 'vertical',
}

interface Props {
  variant: EmissionsDonutChartVariants;
  chartOptions: ChartOptions<'doughnut'>;
  chartPlugins: PluginType<'doughnut'>[];
  totalEmissions?: number;
  isEmptyData?: boolean;
  isLoading?: boolean;
  chartData: ChartData<'doughnut'>;
  subcategoryTotals: SubCategoryTotal[];
  hoverColorArray?: string[];
}

export const CarbonFootprintEmissionsDonutChart = ({
  variant,
  totalEmissions,
  isEmptyData,
  isLoading,
  chartData,
  subcategoryTotals,
  hoverColorArray,
  chartOptions,
  chartPlugins,
}: Props) => {
  return (
    <div className="w-full" data-testid={'footprint-overview-chart'}>
      <Chart options={chartOptions} type="doughnut" data={chartData} plugins={chartPlugins} data-chromatic="ignore" width={347} height={347} />
    </div>
  );
};
