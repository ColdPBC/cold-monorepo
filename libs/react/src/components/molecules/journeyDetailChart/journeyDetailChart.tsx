import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Plugin as PluginType,
} from 'chart.js';
import useSWR from 'swr';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { Spinner } from '../../atoms/spinner/spinner';
import { defaultChartData } from './constants';
import { CustomFlowbiteTheme, Table } from 'flowbite-react';
import { FootprintDetailChip } from '../../atoms/footprintDetailChip/footprintDetailChip';
import { useActiveSegment } from '../../../hooks/useActiveSegment';

export const tableTheme: CustomFlowbiteTheme = {
  table: {
    "root": {
      "base": "w-full text-left text-sm text-gray-500 dark:text-gray-400",
      "shadow": "absolute dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
      "wrapper": "relative border-gray-50 border border-solid rounded-lg bg-gray-50"
    },
    "body": {
      "base": "group/body",
      "cell": {
        "base": "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-6 py-4 bg-bgc-elevated"
      }
    },
    "head": {
      "base": "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
      "cell": {
        "base": "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-none dark:bg-gray-700 px-6 py-3 font-normal"
      }
    },
    "row": {
      "base": "group/row border-t border-gray-50",
      "hovered": "hover:bg-gray-50 dark:hover:bg-gray-600",
      "striped": "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
    }
  }
}

interface LegendRow {
  value: number;
  color: string;
  name: string;
  percent?: number;
};

interface Props {
  setIsEmptyData?: (isEmpty: boolean) => void;
  colors: string[];
  subcategory_key: string;
  period: number;
}

export function JourneyDetailChart({ setIsEmptyData, colors, subcategory_key, period }: Props) {
  const chartRef = useRef<ChartJS>(null);

  const {
    activeSegment,
    setActiveSegment,
    animateSegmentThickness,
    segmentOnHover,
    chartBeforeDraw
  } = useActiveSegment(); 

  const [chartData, setChartData] = useState<ChartData>(defaultChartData);
  const [legendRows, setLegendRows] = useState<LegendRow[]>([]);
  const [totalFootprint, setTotalFootprint] = useState(0);

  // Get footprint data from SWR
  const { data, error, isLoading } = useSWR<any>(
    ['/categories/company_decarbonization', 'GET'],
    axiosFetcher,
  );

  // Update chart data on receiving new data
  useEffect(() => {

      if (!data?.subcategories?.[subcategory_key]) return;

      const newLabels: string[] = [];
      const newData: number[] = [];
      let newTotalFootprint = 0;
      const newLegendRows: LegendRow[] = [];

      // Transform chart data
      Object.keys(data?.subcategories[subcategory_key].activities ?? {}).forEach(
        (activityKey: any) => {
          const activity = data?.subcategories[subcategory_key].activities[activityKey];
          const activityFootprint = activity.footprint?.[period]?.value ?? 0;
          
          if (activityFootprint > 0) {
            newLabels.push(activity.activity_name);
            newData.push(activityFootprint);
            newTotalFootprint += activityFootprint;
          }
      })

      // Populate legend rows
      newData.sort((a, b) => b - a).forEach((nD, i) => {
        newLegendRows.push({
          value: nD,
          color: colors[i],
          name: newLabels[i],
          percent: Math.round((nD / newTotalFootprint) * 100)
        })
      })

      const backgroundColors = newData.map((_, i) => colors[i]);

      const newChartData: ChartData = {
        datasets: [{
          data: newData,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1,
        }],
        labels: newLabels,
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
  };

  if (isLoading) {
    return (
      <div className="h-[284px] flex items-center">
        <Spinner />
      </div>
    );
  } else if (!data?.subcategories?.[subcategory_key]) {
    return null;
  } else if (error) {
    return null;
  }

  return (
    <div className="relative w-full flex items-center">
      <div
        className="h-[200px] w-[225px] relative"
        onMouseLeave={() => {
          setActiveSegment(null);
        }}
      >
        <Chart
          ref={chartRef}
          options={chartOptions}
          type="pie"
          data={chartData}
          plugins={chartPlugins}
        />
        <FootprintDetailChip emissions={totalFootprint} large center />
      </div>
      <Table
        className='text-white'
        theme={tableTheme.table}
        onMouseLeave={() => {
          setActiveSegment(null);
        }}
      >
        <Table.Head className='text-white normal-case'>
          <Table.HeadCell className='w-[225px]' theme={tableTheme.table?.head?.cell}>
            Category
          </Table.HeadCell>
          <Table.HeadCell theme={tableTheme.table?.head?.cell}>
            Breakdown
          </Table.HeadCell>
          <Table.HeadCell theme={tableTheme.table?.head?.cell}>
            tCO2e
          </Table.HeadCell>
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
                theme={tableTheme.table?.row}
              >
                <Table.Cell className='flex items-center font-bold' theme={tableTheme.table?.body?.cell}>
                  <div 
                    style={{
                      background: row.color,
                      border: '2px solid rgba(0, 0, 0, 0.2)'
                    }}
                    className='mr-2 h-[10px] w-[10px] min-w-[10px] rounded-xl'
                  />
                  {row.name}
                </Table.Cell>
                <Table.Cell theme={tableTheme.table?.body?.cell}>
                  {row.percent}%
                </Table.Cell>
                <Table.Cell theme={tableTheme.table?.body?.cell}>
                  {row.value}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
    </div>
  );
}
