import { ChartEvent, ActiveElement, ChartTypeRegistry, Point, BubbleDataPoint, Chart as ChartJS, } from "chart.js";
import { useState } from "react";

const DEFAULT_SEGMENT_THICKNESS = 80;

export type ActiveSegmentMedium = 'segment' | 'legend';

export interface ActiveSegment {
    index?: number; // which segment
    thickness?: number; // how thick currently (I use timeout to animate)
    medium?: ActiveSegmentMedium; // method by which this segment was activated
}

export const useActiveSegment = () => {
    const [activeSegment, setActiveSegment] = useState<null | ActiveSegment>(
        null,
    );

    // set the index of the segment to animate in state
    // use setTimeout to animate the thickness outwards
    const animateSegmentThickness = (
        index: number,
        medium: ActiveSegmentMedium,
    ) => {
        for (let i = 1; i < 11; i++) {
        setTimeout(() => {
            setActiveSegment({
            index,
            medium,
            thickness: DEFAULT_SEGMENT_THICKNESS + i,
            });
        }, 5 * i);
        }
    };

    const segmentOnHover = (event: ChartEvent, elements: ActiveElement[], chart: ChartJS<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>) => {
        // animate thickness of segment on hover
        const currentHoveredElement = elements[0];

        if (
          currentHoveredElement &&
          currentHoveredElement.index !== activeSegment?.index
        ) {
          animateSegmentThickness(currentHoveredElement.index, 'segment');
        }
        // remove extra thickness if mouse is not over segment or a legend item
        else if (!currentHoveredElement && activeSegment?.medium === 'segment') {
            setActiveSegment(null);
        }
    }

    const chartBeforeDraw = (chart: ChartJS, hoverColorArray?: string[]) => {
        chart.getDatasetMeta(0).data.forEach((slice, index) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const chartActiveSegment = chart.config.options?.activeSegment as ActiveSegment;
          if (chartActiveSegment && index === chartActiveSegment.index) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            slice.outerRadius = chartActiveSegment.thickness;
            
            if (hoverColorArray) {
                slice.options.backgroundColor = hoverColorArray[index === 0 ? 0 : index / 2];
            }

          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            slice.outerRadius = DEFAULT_SEGMENT_THICKNESS;
          }
        });
      }

    return {
        activeSegment,
        setActiveSegment,
        animateSegmentThickness,
        segmentOnHover,
        chartBeforeDraw
    };
}