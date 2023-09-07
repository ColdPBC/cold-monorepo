import React, {PropsWithChildren} from 'react';
import {Chart as ChartJS, ArcElement, ChartData, ChartOptions, DoughnutController} from 'chart.js';
import {Chart} from 'react-chartjs-2';
import useSWR from 'swr';
import {axiosFetcher} from '../../../fetchers/axiosFetcher';
import {Spinner} from '../../atoms';
import {HexColors} from '../../../themes/cold_theme';
import {find, forEach, isArray} from 'lodash';
import {FootprintOverviewHorizontalDetail} from './footprintOverviewHorizontalDetail/footprintOverviewHorizontalDetail';

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

export const chartOptions:ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  radius: 80,
  cutout: 90, // Arc should be 30px wide
  rotation: 20,
}

const gapStylingConstant = 100;

export function FootprintOverviewChart(props: PropsWithChildren<FootprintOverviewChartProps>) {
  const {variant = FootprintOverviewVariants.horizontal, period, periodType = 'year'} = props;

  // Get footprint data from SWR
  const {data, error, isLoading} = useSWR<any>(
    ["/categories/company_decarbonization", "GET"],
    axiosFetcher);

  if(isLoading) {
    return (
      <div className="h-[284px] flex items-center">
        <Spinner />
      </div>
    );
  }
  else if(error) {
    error.log(error);
    return <div></div>;
  }

  // Add up all the information from the footprint
  const subcategoryTotals:{value:number, color:string, name:string, percent?:number}[] = [];
  const colorArray:string[] = [HexColors.purple.DEFAULT, HexColors.teal.DEFAULT, HexColors.green.DEFAULT, HexColors.lightblue.DEFAULT];
  let totalFootprint = 0;
  forEach(data.subcategories, (subcategory) => {
    let value = 0;
    const color = colorArray.reverse().pop() || HexColors.primary.DEFAULT;
    forEach(subcategory.activities, (activity) => {
      if (activity.footprint) {
        const footprint = find(activity.footprint, {'period': period, 'period_type': periodType});
        if (footprint) {
          value += footprint.value;
          totalFootprint += footprint.value;
        }
      }
    })
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
      backgroundColor: []
    }],
    labels: [],
  };

  // Add data to the chart, determine total percentages, and build detail views
  const detailViews:JSX.Element[] = [];
  forEach(subcategoryTotals, (info) => {
    info.percent = (info.value / totalFootprint) * 100;

    chartData.labels?.push(info.name);
    chartData.datasets[0].data.push(info.value);
    if (isArray(chartData.datasets[0].backgroundColor))
      chartData.datasets[0].backgroundColor.push(info.color);

    // Add a spacer
    chartData.labels?.push(null);
    chartData.datasets[0].data.push(spacerValue);
    if (isArray(chartData.datasets[0].backgroundColor))
      chartData.datasets[0].backgroundColor?.push("#FFFFFF00"); // make spacer transparent

    const leftAlign = detailViews.length < 2;
    const bottomAlign = detailViews.length === 1 || detailViews.length === 2;
    detailViews.push(
      <div className={"absolute w-[210px] inline-flex gap-2 items-start " +
        (leftAlign ? "left-1/2 translate-x-[104px] justify-start " : "right-1/2 translate-x-[-104px] justify-end ") +
        (bottomAlign ? "bottom-0" : "")}>
        <FootprintOverviewHorizontalDetail color={info.color} title={info.name} percent={info.percent} emissions={info.value} leftAlign={leftAlign} />
      </div>
    )
  });

  return (
    <div className="relative h-[255px] w-full">
      {detailViews}
      <Chart options={chartOptions} type="doughnut" data={chartData} />
    </div>
  );
}
