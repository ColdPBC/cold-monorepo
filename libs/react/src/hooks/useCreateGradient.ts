import { ChartArea } from "chart.js";
import { useState } from "react";

export const useCreateGradient = (
    ctx: CanvasRenderingContext2D | undefined,
    chartArea: ChartArea | undefined,
    colorStart: string,
    colorEnd: string,
) => {
    const [cache, setCache] = useState<{[key: string | number]: CanvasGradient}>({});
    const [width, setWidth] = useState<number | undefined>(undefined);
    const [height, setHeight] = useState<number | undefined>(undefined);

    if (!chartArea || !ctx) {
        // This case happens on initial chart load
        return undefined;
    }
    
      const chartWidth = chartArea.right - chartArea.left;
      const chartHeight = chartArea.bottom - chartArea.top;
      if (width !== chartWidth || height !== chartHeight) {
        setCache({});
      }
      let gradient = cache[colorStart + colorEnd];
    
      if (!gradient) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        setWidth(chartWidth);
        setHeight(chartHeight);
    
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;
        const r = Math.min(
          (chartArea.right - chartArea.left) / 2,
          (chartArea.bottom - chartArea.top) / 2,
        );
    
        gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          r,
        );
    
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
    
        setCache({
            ...cache,
            [colorStart + colorEnd]: gradient
        })
      }
    
      return gradient;
}