import { hexAToRGBA, rgbaToHex } from '@coldpbc/themes';
import { ChartArea } from 'chart.js';

const cache = new Map();
let width: number;
let height: number;

export function createGradient(ctx: CanvasRenderingContext2D | undefined, chartArea: ChartArea | undefined, colorStart: string, colorEnd: string) {
	if (!chartArea || !ctx) {
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

		const centerX = (chartArea.left + chartArea.right) / 2;
		const centerY = (chartArea.top + chartArea.bottom) / 2;
		const r = Math.min((chartArea.right - chartArea.left) / 2, (chartArea.bottom - chartArea.top) / 2);
		if (ctx !== null) {
			gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);

			gradient.addColorStop(0, colorStart);
			gradient.addColorStop(1, colorEnd);

			cache.set(colorStart + colorEnd, gradient);
		}
	}

	return gradient;
}

// Convenience function for getting a value along a gradient
export function pickGradientValue(hexColor1: string, hexColor2: string, percent: number) {
	const w2 = percent;
	const w1 = 1 - w2;

	const color1 = hexAToRGBA(hexColor1, false);
	const color2 = hexAToRGBA(hexColor2, false);

	return rgbaToHex({
		r: Math.round(color1.r * w1 + color2.r * w2),
		g: Math.round(color1.g * w1 + color2.g * w2),
		b: Math.round(color1.b * w1 + color2.b * w2),
	});
}
