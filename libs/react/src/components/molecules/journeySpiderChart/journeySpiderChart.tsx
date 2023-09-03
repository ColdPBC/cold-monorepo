import React, {PropsWithChildren, useRef, useEffect, useState} from 'react';
import { Chart } from 'react-chartjs-2';
import {Chart as ChartJS, RadarController, LineElement, PointElement, RadialLinearScale, Title, Filler, ChartArea, ChartData, ChartOptions} from 'chart.js';
import { hexAToRGBA, HexColors, rgbaToHex } from '../../../themes/cold_theme';
import {isEmpty, isString, forEach, isNumber, cloneDeep} from 'lodash';
import useSWR from 'swr';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { Spinner } from '../../atoms/spinner/spinner';

ChartJS.register(RadarController, LineElement, PointElement, RadialLinearScale, Title, Filler);
//todo:fix JourneySpiderChartProps
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JourneySpiderChartProps {

}

export const fetchedChartData: ChartData = {
    datasets: [{
        data: [],
    }],
};
export const emptyData: ChartData = cloneDeep(fetchedChartData);

export const options:ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 800,
        easing: 'easeOutQuint',
    },
    elements: {
        point: {
            radius: 3,
            borderColor: HexColors.white,
            backgroundColor: HexColors.primary.DEFAULT, // this gets overwritten later
        },
        line: {
            borderWidth: 1,
        }
    },
    scales: {
        r: {
            animate: true,
            max: 100, // TODO - normalize this to whatever the value bounds are once we know them
            min: 0,
            ticks: {
                display: false,
                count: 4,
            },
            pointLabels: {
                color: HexColors.tc.primary,
                font: {
                    family:"'Inter', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
                    size: 12,
                    weight: '500',
                },
                padding: 8,
            },
            grid: {
                color: HexColors.bgc.accent,
            },
            angleLines: {
                color: HexColors.bgc.accent,
            },
        }
    },
    plugins: {
        legend: {
            display:false,
        },
    },
};

const cache = new Map();
let width:number;
let height:number;
function createGradient(ctx: CanvasRenderingContext2D, chartArea: ChartArea, colorStart: string, colorEnd: string) {
    if (!chartArea) {
        // This case happens on initial chart load
        return;
    }

    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (width !== chartWidth || height !== chartHeight) {
        cache.clear();
    }
    let gradient = cache.get(colorStart + colorEnd);

    if (!gradient) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;

        const centerX = ( chartArea.left + chartArea.right ) / 2;
        const centerY = ( chartArea.top + chartArea.bottom ) / 2;
        const r = Math.min(
            ( chartArea.right - chartArea.left ) / 2,
            ( chartArea.bottom - chartArea.top ) / 2
        );

        gradient = ctx.createRadialGradient( centerX, centerY, 0, centerX, centerY, r );

        gradient.addColorStop( 0, colorStart );
        gradient.addColorStop( 1, colorEnd );

        cache.set( colorStart + colorEnd, gradient );
    }

    return gradient;
}

// Convenience function for getting a value along a gradient
function pickGradientValue(hexColor1:string, hexColor2:string, percent:number) {
    const w2 = percent;
    const w1 = 1 - w2;

    const color1 = hexAToRGBA(hexColor1,false);
    const color2 = hexAToRGBA(hexColor2,false);

    return rgbaToHex({r: Math.round(color1.r * w1 + color2.r * w2),
        g: Math.round(color1.g * w1 + color2.g * w2),
        b: Math.round(color1.b * w1 + color2.b * w2)});
}

export function JourneySpiderChart(props: PropsWithChildren<JourneySpiderChartProps>) {
    const chartRef = useRef<ChartJS>(null);

    const [chartOptions, setChartOptions] = useState<ChartOptions>(options);
    // TODO: there's surely a more elegant way to do this but I'm not enough of a react expert to know. We need the state to know when the object has changed and it doesn't see the nested arrays.
    const [chartData, setChartData] = useState<ChartData>(isEmpty(fetchedChartData.labels)?emptyData:fetchedChartData);

    useEffect(() => {
        const chart = chartRef.current;

        if(!chart) {
            return;
        }

        const maxAxisValue = options.scales?.r?.max || 100;

        const chartOptions:ChartOptions= {
            ...options,
            backgroundColor: createGradient( chart.ctx, chart.chartArea, HexColors.white+"00", HexColors.primary.DEFAULT+"40"), // 25% transparency
            borderColor: createGradient( chart.ctx, chart.chartArea, "#E1E2EB", HexColors.primary.DEFAULT),
        };

        // Get the right color for each of the points based on their value
        const pointColors:string[] = [];
        chartData.datasets[0].data.forEach((dataPoint: any) => {
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
        setChartData(chartData);
    }, [chartData]);

    // Fetch chart data
     const {data, error, isLoading} = useSWR<any>(
        ["/categories/", "GET"],
        axiosFetcher,
        { onSuccess: (data, key, config) => {
            if (data.categories) {
                const newLabels:string[] = [], newData:number[] = [];
                // Transform chart data
                forEach(data.categories, (category) => {
                    forEach(category.subcategories, (subcategory) => {
                        if (subcategory.journey_score) {
                            newLabels.push(subcategory.subcategory_name);
                            newData.push(subcategory.journey_score);
                        }
                    })
                })
                fetchedChartData.labels = newLabels;
                fetchedChartData.datasets[0].data = newData;

                setChartData(fetchedChartData);
            }
        }}
    );

    if(isLoading) {
        return (
            <div className="h-[284px] flex items-center">
                <Spinner />
            </div>
        );
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
