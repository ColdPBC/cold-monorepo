import React, {PropsWithChildren, useState} from 'react';
import {Chart as ChartJS, ArcElement, ChartData, ChartOptions, DoughnutController, Plugin as PluginType, ChartEvent} from 'chart.js';
import {Chart} from 'react-chartjs-2';
import useSWR from 'swr';
import {axiosFetcher} from '@coldpbc/fetchers';
import {Spinner} from '../../atoms';
import {HexColors} from '@coldpbc/themes';
import {forEach, isArray, some} from 'lodash';
import {FootprintOverviewHorizontalDetail} from './footprintOverviewHorizontalDetail';
import clsx from 'clsx';
import { FootprintOverviewVerticalDetail } from './footprintOverviewVerticalDetail';

export interface FootprintOverviewDetail {
  color:string,
  title:string,
  percent:number,
  emissions:number,
}

export function FootprintOverviewDetailChip(props:{emissions:number; large?: boolean;}) {
  return (
    <div className="flex px-2 py-1 items-center gap-2 rounded-2xl bg-bgc-accent">
      <div className="text-label text-tc-primary">
        <span className={clsx({"font-bold text-base": props.large})}>{props.emissions.toFixed(props.large ? 1 : 2)}</span> tCO2e
      </div>
    </div>
  );
}

const NO_DATA_CHART_DATA = [
  {
      "data": [
          30,
          1.9423000000000001,
          26,
          1.9423000000000001,
          60,
          1.9423000000000001,
          80,
          1.9423000000000001
      ],
      "borderRadius": 2,
      "borderWidth": 0,
      "backgroundColor": [
        HexColors.teal.DEFAULT,
        "#FFFFFF00",
        HexColors.green.DEFAULT,
        "#FFFFFF00",
        HexColors.purple.DEFAULT,
        "#FFFFFF00",
        HexColors.lightblue.DEFAULT,
        "#FFFFFF00"
      ]
  }
];

const MAX_CATEGORIES = 4;
const DEFAULT_SEGMENT_THICKNESS = 80;

ChartJS.register(ArcElement, DoughnutController);

export enum FootprintOverviewVariants {
  horizontal = 'horizontal', // horizontal is the default
  vertical = 'vertical',
}

export interface FootprintOverviewChartProps {
  variant?:FootprintOverviewVariants,
  period:number|string,
  periodType?:string, // year should be the default
}

const gapStylingConstant = 100;

type ActiveSegmentMedium = 'segment' | 'legend';
interface ActiveSegment {
  index?: number; // which segment
  thickness?: number; // how thick currently (I use timeout to animate)
  medium?: ActiveSegmentMedium; // method by which this segment was activated
}

export function FootprintOverviewChart(props: PropsWithChildren<FootprintOverviewChartProps>) {
  const [activeSegment, setActiveSegment] = useState<null | ActiveSegment>(null);

  const {variant = FootprintOverviewVariants.horizontal, period, periodType = 'year'} = props;

  // Get footprint data from SWR
  const {data, error, isLoading} = useSWR<any>(
    ["/categories/company_decarbonization", "GET"],
    axiosFetcher);

  // set the index of the segment to animate in state
  // use setTimeout to animate the thickness outwards
  const animateSegmentThickness = (index: number, medium: ActiveSegmentMedium) => {
    for (let i = 1; i < 11; i++) {
      setTimeout(() => {
        setActiveSegment({
          index,
          medium,
          thickness: DEFAULT_SEGMENT_THICKNESS + i,
        });
      }, 5 * i)
    }
  }

  // account for spacer elements, need to offset index
  const getIndexOffsetForSegment = (index: number) => {
    return index === 0 ? 0 : index + index;
  }

  const chartOptions:ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    radius: 80,
    cutout: 90, // Arc should be 30px wide
    rotation: 20,
    onHover(event, elements, chart) {
      // animate thickness of segment on hover
      const currentHoveredElement = elements[0];
      if (currentHoveredElement && currentHoveredElement.index !== activeSegment?.index) {
        animateSegmentThickness(currentHoveredElement.index, 'segment')
      }
      // remove extra thickness if mouse is not over segment or a legend item
      else if (!currentHoveredElement && activeSegment?.medium === 'segment') {
        setActiveSegment(null);
      }
    },
    // @ts-ignore - inject this into the chart options
    activeSegment,
  }

  const isEmptyFootprintData = !isLoading && !some(data.subcategories, (
    (subcategory: any) => some(subcategory.activities, (
        (activity: any) => activity.footprint[props.period]))));

  if(isLoading) {
    return (
      <div className="h-[284px] flex items-center">
        <Spinner />
      </div>
    );
  }
  else if (isEmptyFootprintData) {
    return (
      <div className="relative h-[255px] w-full">
        <svg className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
          <rect x="37.5" y="21.5" width="6" height="22.5" rx="2" fill="white"/>
          <rect x="37.5" y="48.5" width="6" height="6" rx="2" fill="white"/>
        </svg>
        <Chart options={chartOptions} type="doughnut" data={{datasets: NO_DATA_CHART_DATA}} />
      </div>
    )
  }
  else if(error) {
    error.log(error);
    return <div></div>;
  }

  // Add up all the information from the footprint
  const subcategoryTotals:{value:number, color:string, name:string, percent?:number}[] = [];
  const colorArray:string[] = [HexColors.purple.DEFAULT, HexColors.teal.DEFAULT, HexColors.green.DEFAULT, HexColors.lightblue.DEFAULT];
  const hoverColorArray:string[] = [HexColors.purple.DEFAULT_BRIGHTEN, HexColors.lightblue.DEFAULT_BRIGHTEN, HexColors.teal.DEFAULT_BRIGHTEN, HexColors.green.DEFAULT_BRIGHTEN];
  let totalFootprint = 0;
  forEach(data.subcategories, (subcategory) => {
    let value = 0;
    const color = colorArray.reverse().pop() || HexColors.primary.DEFAULT;

    forEach(subcategory.activities, (activity) => {
      if (activity.footprint && period in activity.footprint) {
        const footprint = activity.footprint[period];
        if (footprint) {
          value += footprint.value;
          totalFootprint += footprint.value;
        }
      }
    })
    if (subcategoryTotals.length >= MAX_CATEGORIES) return;
    subcategoryTotals.push({value: value, color: color, name:subcategory.subcategory_name});
  });

  // Set spacer width
  const spacerValue = totalFootprint/gapStylingConstant;

  // Reset the chart data
  const chartData:ChartData<'doughnut'> = {
    datasets:[{
      data: [],
      borderRadius: 2,
      borderWidth: 0,
      backgroundColor: [],
    }],
    labels: [],
  };

  // Add data to the chart, determine total percentages, and build detail views
  const detailViews: JSX.Element[] = [];
  forEach(subcategoryTotals, (info, index) => {
    info.percent = (info.value / totalFootprint) * 100;

    chartData.labels?.push(info.name);
    chartData.datasets[0].data.push(info.value);

    if (isArray(chartData.datasets[0].backgroundColor)) {
      chartData.datasets[0].backgroundColor?.push(info.color);
    }

    // Add a spacer
    chartData.labels?.push(null);
    chartData.datasets[0].data.push(spacerValue);
    // @ts-ignore
    chartData.datasets[0].backgroundColor?.push("#FFFFFF00"); // make spacer transparent

    const leftAlign = detailViews.length < 2;
    const bottomAlign = detailViews.length === 1 || detailViews.length === 2;
    detailViews.push(
      <div
          key={info.name}
          className={clsx({
            "absolute w-[210px] inline-flex gap-2 items-start": variant === FootprintOverviewVariants.horizontal,
            "left-1/2 translate-x-[104px] justify-start": variant === FootprintOverviewVariants.horizontal && leftAlign,
            "right-1/2 translate-x-[-104px] justify-end": variant === FootprintOverviewVariants.horizontal && !leftAlign,
            "bottom-0": bottomAlign })
          }
          onMouseEnter={() => {
            animateSegmentThickness(getIndexOffsetForSegment(index), 'legend')
          }}
          onMouseLeave={() => {
            setActiveSegment(null);
          }}
      >
        {variant === FootprintOverviewVariants.horizontal ?
          <FootprintOverviewHorizontalDetail
            color={info.color}
            title={info.name}
            percent={info.percent}
            emissions={info.value}
            leftAlign={leftAlign}
          />
          :
          <FootprintOverviewVerticalDetail
            color={info.color}
            title={info.name}
            percent={info.percent}
            emissions={info.value}
          />
        }
      </div>
    )
  });

  // Create plugins for chart
  const chartPlugins:  PluginType<"doughnut">[] = [
    {
      id: 'sliceThickness',
      beforeDraw( chart: ChartJS): boolean | void {
        chart.getDatasetMeta(0).data.forEach((slice, index) => {
          // @ts-ignore
          const chartActiveSegment = chart.config.options?.activeSegment as ActiveSegment;

          if (chartActiveSegment && index === chartActiveSegment.index) {
            // @ts-ignore
            slice.outerRadius = chartActiveSegment.thickness;
            slice.options.backgroundColor = hoverColorArray[index === 0 ? 0 : index / 2];
          } else {
            // @ts-ignore
            slice.outerRadius = DEFAULT_SEGMENT_THICKNESS
          }
        })
      },
    }
  ];

  return (
    <div className="w-full">
      <div className='h-[255px] w-full relative'>
        {variant === FootprintOverviewVariants.horizontal && detailViews}
        {variant === FootprintOverviewVariants.vertical &&
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <FootprintOverviewDetailChip emissions={totalFootprint} large />
          </div>
        }
        <Chart options={chartOptions} type="doughnut" data={chartData} plugins={chartPlugins} />
      </div>
      {variant === FootprintOverviewVariants.vertical &&
        <div className='max-w-md m-auto -mt-6 -mb-3'>
          {detailViews}
        </div>
      }
    </div>
  );
}
