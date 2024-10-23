import { ActiveElement, BubbleDataPoint, Chart as ChartJS, ChartEvent, ChartTypeRegistry, Point } from 'chart.js';
import { useState } from 'react';

const DEFAULT_SEGMENT_THICKNESS = 80;

export type ActiveSegmentMedium = 'segment' | 'legend';

export interface ActiveSegment {
	index?: number; // which segment
	thickness?: number; // how thick currently (I use timeout to animate)
	medium?: ActiveSegmentMedium; // method by which this segment was activated
}

export const useActiveSegment = ({ chartHasSpacers }: { chartHasSpacers: boolean }) => {
	const [activeSegment, setActiveSegment] = useState<null | ActiveSegment>(null);

	const animateSegmentThickness = (index: number, medium: ActiveSegmentMedium, thickness?: number) => {
		setActiveSegment({
			index,
			medium,
			thickness: thickness ? thickness : DEFAULT_SEGMENT_THICKNESS + 10,
		});
	};

	const segmentOnHover = (
		event: ChartEvent,
		elements: ActiveElement[],
		chart: ChartJS<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>,
		thickness?: number,
	) => {
		// animate thickness of segment on hover
		const currentHoveredElement = elements[0];

		if (
			currentHoveredElement &&
			currentHoveredElement.index !== activeSegment?.index &&
			(currentHoveredElement.index % 2 === 0 || !chartHasSpacers) // spacer will be odd number
		) {
			animateSegmentThickness(currentHoveredElement.index, 'segment', thickness);
		}
		// remove extra thickness if mouse is not over segment or a legend item
		else if (!currentHoveredElement && activeSegment?.medium === 'segment') {
			setActiveSegment(null);
		}
	};

	const chartBeforeDraw = (chart: ChartJS, hoverColorArray?: string[], useDefaultThickness?: boolean, updateInnerRadius?: boolean) => {
		chart.getDatasetMeta(0).data.forEach((slice, index) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const chartActiveSegment = chart.config.options?.activeSegment as ActiveSegment;
			if (chartActiveSegment && index === chartActiveSegment.index) {
				if (updateInnerRadius) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					slice.innerRadius = chartActiveSegment.thickness;
				} else {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					slice.outerRadius = chartActiveSegment.thickness;
				}

				if (hoverColorArray) {
					slice.options.backgroundColor = hoverColorArray[index === 0 ? 0 : index / 2];
				}
			} else {
				if (!useDefaultThickness) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					slice.outerRadius = DEFAULT_SEGMENT_THICKNESS;
				}
			}
		});
	};

	return {
		activeSegment,
		setActiveSegment,
		animateSegmentThickness,
		segmentOnHover,
		chartBeforeDraw,
	};
};
