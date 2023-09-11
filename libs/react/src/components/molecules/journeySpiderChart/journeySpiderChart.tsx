import {useRef, useEffect, useState} from 'react';
import { Chart } from 'react-chartjs-2';
import {Chart as ChartJS, RadarController, LineElement, PointElement, RadialLinearScale, Title, Filler, ChartData, ChartOptions} from 'chart.js';
import { HexColors } from '../../../themes/cold_theme';
import {isString, forEach, isNumber} from 'lodash';
import useSWR from 'swr';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { Spinner } from '../../atoms/spinner/spinner';
import { options, defaultChartData, emptyChartData } from './constants';
import { createGradient, pickGradientValue } from './helpers';

ChartJS.register(RadarController, LineElement, PointElement, RadialLinearScale, Title, Filler);

interface Props {
    setIsEmptyData?: (isEmpty: boolean) => void;
}

export function JourneySpiderChart({ setIsEmptyData }: Props) {
    const chartRef = useRef<ChartJS>(null);

    const [chartOptions, setChartOptions] = useState<ChartOptions>(options);
    const [chartData, setChartData] = useState<ChartData>(defaultChartData);

    // Fetch chart data
    const {data, error, isLoading} = useSWR<any>(["/categories/", "GET"], axiosFetcher);

    // Update chart data on receiving new data
    useEffect(() => {
        if (data?.categories.length !== 0) {
            const newLabels:string[] = [], newData:number[] = [];
            // Transform chart data
            forEach(data?.categories, (category) => {
                forEach(category.subcategories, (subcategory) => {
                    if (subcategory.journey_score) {
                        newLabels.push(subcategory.subcategory_name);
                        newData.push(subcategory.journey_score);
                    }
                })
            })

            const newChartData: ChartData = {
                datasets: [{data: newData}],
                labels: newLabels
            };

            const chart = chartRef.current;

            if(!chart) {
                return;
            }
    
            const maxAxisValue = options.scales?.r?.max || 100;
    
            const chartOptions:ChartOptions= {
                ...options,
                backgroundColor: createGradient( chart.ctx, chart.chartArea, HexColors.white+"00", HexColors.primary.DEFAULT+"40"), // 25% transparency
                borderColor: createGradient( chart.ctx, chart.chartArea, HexColors.gray['130'], HexColors.primary.DEFAULT),
            };
    
            // Get the right color for each of the points based on their value
            const pointColors:string[] = [];
            newChartData.datasets[0].data.forEach((dataPoint: any) => {
              pointColors.push(
                pickGradientValue(
                  HexColors.white,
                  HexColors.primary.DEFAULT,
                  (isNumber(dataPoint) ? dataPoint : 0) /
                    (isString(maxAxisValue)
                      ? parseFloat(maxAxisValue)
                      : maxAxisValue)
                )
              );
            });
            if (chartOptions.elements?.point)
                chartOptions.elements.point.backgroundColor = pointColors;
    
            setChartOptions(chartOptions);
            setChartData(newChartData);
            if (setIsEmptyData) setIsEmptyData(false);
        } else {
            if (setIsEmptyData) setIsEmptyData(true);
        }
    }, [data, chartRef.current]);

    if(isLoading) {
        return (
            <div className="h-[284px] flex items-center">
                <Spinner />
            </div>
        );
    } else if (chartData.datasets[0].data.length === 0) {
        return (
            <div className="relative h-[150px] w-full">
                <Chart
                    ref={chartRef}
                    options={{
                        ...chartOptions,
                        backgroundColor: chartRef.current ? 
                            createGradient( chartRef.current.ctx, chartRef.current.chartArea, HexColors.white+"00", HexColors.white+"60")
                            : undefined,
                        elements: {
                            line: {
                              borderWidth: 3,
                              borderColor: '#FFFFFF',
                            },
                            point: {
                                backgroundColor: '#FFFFFF',
                                borderColor: '#FFFFFF',
                                radius: 1
                            },
                        }
                    }}
                    type="radar"
                    data={emptyChartData}
                />
            </div>
        )
    }
    else if(error) {
        return <div></div>;
    }

    return (
      <div className="relative h-[284px] w-full">
          <Chart ref={chartRef} options={chartOptions} type="radar" data={chartData}/>
      </div>
    );
}
